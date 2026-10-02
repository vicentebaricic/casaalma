# Casa Alma - Documentos del proyecto

Todos los archivos son texto plano en Markdown (.md). Se abren y se editan con cualquier editor de texto (Bloc de notas, VS Code, Obsidian o el editor web de GitHub).

## Estructura

- `proyecto-claude/`: los archivos que se cargan al proyecto "Casa Alma" en Claude.
  - Se suben como archivos del proyecto: `brief_casa_alma.md`, `faq_y_politicas.md`, `guia_de_estilo_bot.md`, `ruta_chatbot_paso_a_paso.md`, `bitacora_casa_alma.md`, `Propuesta_Casa_Alma.pdf`.
  - `instrucciones_proyecto_casa_alma.md`: su bloque de código se pega en el campo "Instrucciones" del proyecto. No se sube como archivo.
- `chat-chatbot/`: `actualizacion_para_chat_chatbot.md`, para pegar en el chat donde se desarrolla el bot.

## Qué hace cada archivo y cuándo se edita

| Archivo | Para qué sirve | Cuándo actualizarlo |
|---|---|---|
| brief_casa_alma.md | Ficha del negocio, políticas, cuentas, contrato | Cuando cambie algo del negocio o del acuerdo |
| faq_y_politicas.md | Base de conocimiento del bot (lo que el bot responde) | Cada vez que Malik confirme o cambie un dato. Es el más importante |
| guia_de_estilo_bot.md | Ley espejo y bloque del prompt | Cuando se ajuste el tono del bot |
| ruta_chatbot_paso_a_paso.md | Pasos del chatbot y su estado | Al terminar cada paso (cambiar [ ] por [x]) |
| bitacora_casa_alma.md | Decisiones, pendientes, estado técnico, aprendizajes | Al cerrar cada sesión de trabajo |

## Flujo de actualización

1. Edita el archivo en tu carpeta o repositorio (esta es la versión oficial).
2. Cambia la línea de fecha de "Última actualización" si el archivo la tiene.
3. Reemplaza el archivo en el proyecto de Claude: los archivos del proyecto no se actualizan solos.
4. Si cambió la base de conocimiento (`faq_y_politicas.md`), actualiza también el prompt o la fuente de datos del bot en n8n.

## Para un cliente nuevo

Copia esta carpeta completa, cámbiale el nombre y reemplaza el contenido de cada archivo con los datos del nuevo cliente. La estructura y la ruta de pasos se reutilizan.

## Reglas

- Nunca guardar contraseñas, tokens ni claves de API en estos archivos.
- Lo que no esté confirmado se marca como [POR CONFIRMAR] o [FALTA]. No se inventa.
