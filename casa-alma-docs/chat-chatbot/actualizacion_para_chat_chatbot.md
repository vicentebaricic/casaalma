# Actualización de decisiones del proyecto Casa Alma (para pegar en el chat del chatbot)

Estas decisiones se tomaron en el proyecto después de tu resumen. Tómalas como vigentes. El resto de tu contexto sigue igual.

1. **Alcance de la fase 1:** responder preguntas frecuentes, enviar links de compra, conversar con quien consulta por un evento privado y entregar un resumen del lead, y derivar a Malik. Las difusiones quedan pendientes para una fase posterior. Reservar = enviar el link de la ficha de la fecha en Shopify (se paga en el sitio). El bot no toma pagos.
2. **Derivación (opción 1):** el bot avisa a Malik por WhatsApp al +56 9 6753 2727 con un resumen y un link para escribirle al cliente, y se pausa en esa conversación. Si Malik no responde en un tiempo por definir, el bot le manda un recordatorio. Requiere una plantilla de aviso aprobada por Meta y agregar el número de Malik a los destinatarios de prueba.
3. **Coexistencia: descartada.** Meta la limita a Tech Providers y Solution Partners. Corrige el punto de tu contexto sobre conservar la app: el bot usará un número nuevo que no esté activo en WhatsApp.
4. **Registro de conversaciones:** cada mensaje (cliente y bot) se guarda en una hoja de Google, con acceso de lectura para Malik. Columnas: fecha y hora, número del cliente, quién escribió, texto, estado (normal o derivada).
5. **Disponibilidad de fechas:** leer la lista pública `https://www.casalma.cl/collections/experiencias-casa-alma/products.json`. Cada variante trae `available` (true o false), sin cantidades. No hace falta acceso de administrador. Ignorar productos de fechas pasadas.
6. **Estilo del bot:** "ley espejo", definida en `guia_de_estilo_bot.md`, que incluye el bloque listo para el prompt y 10 casos de prueba.
7. **Flujo de leads:** usar el flujo en tres etapas y la plantilla de resumen de `faq_y_politicas.md` (sección 4). Destino del resumen aún pendiente (propuesta: aviso por WhatsApp a Malik más una hoja con estado).
8. **Base de conocimiento:** `faq_y_politicas.md`. Si algo no está ahí, el bot no lo inventa y deriva.
9. **Primer mensaje del bot:** avisa que es el asistente virtual de Casa Alma y que la conversación queda registrada.
10. **Política de IA de Meta:** los bots de atención de un negocio están permitidos. Confirmar en los términos oficiales antes de salir a producción.
11. **Costos y prueba:** Malik paga el hosting de n8n. Ahora se prueba en la prueba gratuita de n8n Cloud para medir ejecuciones por tipo de interacción y proyectar el volumen mensual (ver la sección "Prueba gratuita de n8n Cloud" de la bitácora).

**Siguiente paso sugerido:** conectar la disponibilidad desde Shopify y la base de conocimiento al flujo, y probar con el número de prueba.
