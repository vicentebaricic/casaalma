# Correo de confirmación de pedido — Casa Alma

**Dónde:** Admin de Shopify → Configuración → Notificaciones → Notificaciones a clientes → **Confirmación de pedido** → **Editar código**.

Son 3 pasos. Antes de guardar, usa **Vista previa** y **Enviar correo de prueba**.

---

## Paso 1 · Asunto del correo

Reemplaza el asunto por:

```
¡Tu reserva en Casa Alma está confirmada! · Pedido {{ name }}
```

## Paso 2 · Título y saludo

Al principio del código hay dos bloques `{% capture email_title %}` y `{% capture email_body %}`.
Reemplaza **lo que está entre** `{% capture email_title %}` y su `{% endcapture %}` por:

```
¡Gracias, {{ customer.first_name | default: billing_address.first_name }}! Tu reserva está confirmada
```

Y **lo que está entre** `{% capture email_body %}` y su `{% endcapture %}` por:

```
Te esperamos en Casa Alma. Abajo tienes todo lo que necesitas para tu noche.
```

## Paso 3 · Bloque con los datos de la noche

Busca (Cmd+F / Ctrl+F) el texto `email_body }}`. Justo **después** de esa línea y de su `</p>` (si lo hay), pega este bloque completo:

```liquid
{%- comment -%} ===== Casa Alma · datos de la Experiencia (solo si el pedido incluye una) ===== {%- endcomment -%}
{%- assign ca_lines = '' -%}
{%- for line in line_items -%}
  {%- if line.title contains 'Experiencia Casa Alma' -%}{%- assign ca_lines = 'si' -%}{%- endif -%}
{%- endfor -%}
{%- if ca_lines == 'si' -%}
<table style="width:100%;border-collapse:collapse;margin:24px 0;border:1px solid #e3d9c6;">
  <tr><td style="padding:22px 24px;background:#faf7f1;font-family:Helvetica,Arial,sans-serif;color:#2b2620;font-size:15px;line-height:1.6;">

    {%- for line in line_items -%}
      {%- if line.title contains 'Experiencia Casa Alma' -%}
        {%- assign ca_fecha = line.title | remove_first: 'Experiencia Casa Alma' | strip -%}
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a8874c;">Experiencia Casa Alma</p>
        <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:24px;color:#1c1814;">{{ ca_fecha }}</p>
        <p style="margin:0 0 4px;"><strong>{{ line.quantity }} {% if line.quantity == 1 %}persona{% else %}personas{% endif %}</strong> · Horario: 20:00 a 00:30 hrs</p>
        {%- for p in line.properties -%}
          {%- if p.first == 'Restricciones alimentarias' and p.last != blank -%}
            <p style="margin:0 0 4px;">Restricciones alimentarias: <strong>{{ p.last }}</strong> · quedaron registradas en tu pedido.</p>
          {%- endif -%}
        {%- endfor -%}
        <p style="margin:0 0 16px;"></p>
      {%- endif -%}
    {%- endfor -%}

    <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a8874c;">Dirección</p>
    <p style="margin:0 0 6px;"><strong>Las Mercedes 10, Liray, Colina</strong></p>
    <p style="margin:0 0 16px;">En Waze o Google Maps busca <strong>"Casa Alma Liray"</strong>:
      <a href="https://www.google.com/maps/search/?api=1&query=Casa+Alma+Liray" style="color:#a8874c;">abrir en Google Maps</a>.
      Hay estacionamiento privado. Esta dirección es solo para invitados: por favor no la compartas en redes.</p>

    <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a8874c;">Incluye</p>
    <p style="margin:0 0 16px;">Cena de 6 tiempos, maridaje de vinos, música en vivo y show. No hay nada que pagar durante la noche. Solo mayores de 18 años.</p>

    <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a8874c;">Condiciones</p>
    <p style="margin:0 0 16px;">La entrada no tiene devolución ni cambio de fecha. Si no puedes asistir, puedes cederla a otra persona:
      <a href="https://wa.me/56967532727?text=Hola%20Casa%20Alma%2C%20quiero%20ceder%20mi%20entrada%20del%20pedido%20{{ name | url_encode }}%20a%20otra%20persona." style="color:#a8874c;">avísanos por WhatsApp</a>.</p>

    <p style="margin:0;">¿Dudas? Escríbenos al <a href="https://wa.me/56967532727?text=Hola%20Casa%20Alma%2C%20tengo%20una%20consulta%20sobre%20mi%20pedido%20{{ name | url_encode }}." style="color:#a8874c;">+56 9 6753 2727</a>.</p>
  </td></tr>
</table>
{%- endif -%}
{%- comment -%} ===== fin bloque Casa Alma ===== {%- endcomment -%}
```

Si el pedido no incluye una Experiencia (por ejemplo, un producto Alma.life), el bloque no aparece y el correo queda como siempre.

---

## Cómo probarlo

1. **Vista previa** (arriba a la derecha): Shopify usa un pedido de ejemplo, que **no** es una Experiencia, así que ahí el bloque no se ve. Es normal.
2. Para verlo de verdad: haz la **compra de prueba** de 1 entrada con una restricción alimentaria escrita, revisa el correo que llega, y después reembolsa el pedido.

## Qué datos son fijos (cámbialos aquí si cambian)

- Horario: 20:00 a 00:30 hrs
- Dirección: Las Mercedes 10, Liray, Colina
- Qué incluye y condiciones de cesión
- WhatsApp: +56 9 6753 2727
