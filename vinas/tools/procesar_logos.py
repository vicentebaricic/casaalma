import sys, numpy as np
from PIL import Image, ImageFilter
src_dir, out_dir = sys.argv[1], sys.argv[2]
LOGOS = [  # archivo, slug, nombre
 ("viña1.png","valle-secreto","Valle Secreto"),
 ("viña2.jpeg","dagaz","Dagaz"),
 ("viña3.webp","vina-choapa","Viña Choapa"),
 ("viña4.png","vinateros-de-raiz","Viñateros de Raíz"),
 ("viña5.webp","casillero-del-diablo","Casillero del Diablo"),
 ("viña6.png","miguel-torres","Miguel Torres Chile"),
 ("viña7.png","santa-carolina","Santa Carolina"),
 ("viña8.png","lof","Lof", 0.72),  # solo texto grueso: se ve más pesado, se reduce
]
CREAM = np.array([0xEF,0xE6,0xD6], dtype=np.float32)
CW, CH = 800, 400           # lienzo común 2:1
TARGET_FILL = 0.30          # área de "tinta" objetivo relativa al lienzo (mismo peso visual)

for entry in LOGOS:
    fn, slug, name = entry[:3]
    factor = entry[3] if len(entry) > 3 else 1.0
    import glob, re
    num = re.search(r"(\d+)", fn).group(1)
    path = next(f for f in glob.glob(f"{src_dir}/*") if re.search(rf"a{num}\.", f))
    im = Image.open(path).convert("RGBA")
    # 1) Mejora de definición: llevar el lado mayor a >= 2000 px antes de procesar
    scale = max(1, 2000 / max(im.size))
    if scale > 1:
        im = im.resize((round(im.width*scale), round(im.height*scale)), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32)
    rgb, alpha = a[...,:3], a[...,3:4]/255
    # 2) Componer sobre blanco y medir "tinta" = cuánto se aleja del blanco (canal más oscuro)
    over_white = rgb*alpha + 255*(1-alpha)
    ink = 255 - over_white.min(axis=2)
    lo = 18                                      # el blanco / gris muy claro (fondos, marcos tenues) desaparece
    hi = np.percentile(ink[ink > lo], 99) if (ink > lo).any() else 255
    op = np.clip((ink - lo) / max(hi - lo, 1), 0, 1)
    op = op ** 0.85                              # leve refuerzo de medios tonos (dorados) para que no se pierdan
    # 3) Bordes nítidos: suavizado mínimo + contraste de la máscara
    m = Image.fromarray((op*255).astype(np.uint8)).filter(ImageFilter.UnsharpMask(radius=2, percent=120, threshold=2))
    op = np.asarray(m).astype(np.float32)/255
    # 4) Recorte a la tinta real
    ys, xs = np.where(op > 0.12)
    y0,y1,x0,x1 = ys.min(), ys.max()+1, xs.min(), xs.max()+1
    op = op[y0:y1, x0:x1]
    # 5) Mismo color (crema de la marca)
    out = np.zeros((*op.shape,4), dtype=np.uint8)
    out[...,:3] = CREAM
    out[...,3] = (op*255).astype(np.uint8)
    logo = Image.fromarray(out, "RGBA")
    # 6) Mismo peso visual: escalar por área de tinta, dentro de un lienzo 2:1 común
    ink_area = (op > 0.12).sum() / op.size * (logo.width*logo.height)   # px de tinta
    s = (TARGET_FILL*CW*CH*0.55 / max(ink_area,1)) ** 0.5
    s = min(s * factor, (CW*0.92)/logo.width, (CH*0.86)/logo.height)
    logo = logo.resize((max(1,round(logo.width*s)), max(1,round(logo.height*s))), Image.LANCZOS)
    canvas = Image.new("RGBA",(CW,CH),(0,0,0,0))
    canvas.alpha_composite(logo, ((CW-logo.width)//2, (CH-logo.height)//2))
    canvas.save(f"{out_dir}/ca-vina-{slug}.png", optimize=True)
    print(slug, logo.size)
