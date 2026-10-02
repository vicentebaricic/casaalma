# Casa Alma - Ruta del chatbot, paso a paso

Estado a: 2 de octubre de 2026. Marcas: [x] hecho, [~] en curso, [ ] pendiente.

## Cómo usar este archivo (para el asistente)

1. Al empezar un chat del chatbot, lee este archivo y la bitácora. Dime en qué paso estamos y cuál es el siguiente.
2. Dame **un paso concreto a la vez** y espera mi resultado antes de seguir. Haz las preguntas de a una.
3. Si algo depende de datos actuales (precios, límites, políticas, interfaz de Meta o n8n) y no tienes certeza, dilo y dime cómo verificarlo.
4. Nunca me pidas ni escribas tokens, contraseñas o secretos. Se pegan directo en n8n.
5. Al cerrar la sesión, dime qué pasos se marcaron como hechos para que actualice este archivo.

Las decisiones tomadas están en `bitacora_casa_alma.md` y la información del negocio en `faq_y_politicas.md`, `guia_de_estilo_bot.md` y `brief_casa_alma.md`.

---

## Fase 0 - Base (hecha)

- [x] Portfolio comercial "Casa Alma" con verificación de empresa.
- [x] App de Meta en modo desarrollo, con la cuenta de WhatsApp de prueba y la cuenta real (sin número todavía).
- [x] n8n Cloud en prueba, con un flujo publicado de punta a punta (recibe el mensaje, descarta avisos de estado y responde con un eco).
- [x] Brief, base de conocimiento, guía de estilo y decisiones documentadas.

## Fase 1 - Preparar la prueba gratuita (en curso)

- [~] **1. Anotar el fin de la prueba y su tope de ejecuciones** (se ve en la cuenta de n8n).
- [ ] **2. Crear la plantilla de aviso para Malik y enviarla a aprobación en Meta.** Hacerlo ya: la aprobación puede tardar y el aviso de derivación depende de ella. Contenido: nombre del cliente, motivo, resumen y link para escribirle.
- [ ] **3. Agregar el número de Malik (+56 9 6753 2727) a los destinatarios del número de prueba** (admite hasta 5).
- [ ] **4. Crear la hoja de Google de registro** con las columnas: fecha y hora, número del cliente, quién escribió (cliente o bot), texto, estado (normal o derivada). Dar acceso de lectura a Malik.

## Fase 2 - Construir el flujo (siguiente)

Todo vive en **un único flujo de entrada**: Meta admite una sola Callback URL por app y n8n un solo WhatsApp Trigger por app.

- [ ] **5. Registrar cada mensaje (cliente y bot) en la hoja.**
- [ ] **6. Leer la disponibilidad desde Shopify.** Consultar `https://www.casalma.cl/collections/experiencias-casa-alma/products.json` (variante `available` en true o false). Ignorar fechas pasadas y no ofrecer las agotadas. No necesita acceso de administrador.
- [ ] **7. Agente de IA con la base de conocimiento y la guía de estilo.** Memoria por número del cliente (últimos 6 a 8 mensajes). Primer mensaje: avisa que es el asistente virtual y que la conversación queda registrada.
- [ ] **8. Transcripción de audios.**
- [ ] **9. Flujo de leads de eventos privados**, en tres etapas y con la plantilla de resumen de `faq_y_politicas.md` (sección 4). Destino del resumen: pendiente de Malik (propuesta: aviso por WhatsApp más una hoja con estado).
- [ ] **10. Derivación a Malik:** aviso con la plantilla, pausa del bot en esa conversación (marcador en la hoja) y recordatorio si no responde.

Casos que deriva: pide hablar con un humano, reclamo, solicitud especial (incluye ceder una entrada), fecha agotada que quiere conseguir, pagos y devoluciones, y todo lo que no esté en la base de conocimiento.

## Fase 3 - Pruebas y medición (con el número de prueba)

- [ ] **11. Correr las pruebas:** los 10 casos de `guia_de_estilo_bot.md`, 3 leads completos de eventos privados, 5 consultas de disponibilidad y algunos audios.
- [ ] **12. Medir ejecuciones.** En Executions de n8n, anotar cuántas gasta cada tipo de interacción y cuántas son avisos de estado: consulta simple, consulta con Shopify y lead completo (referencia: 15 a 25).
- [ ] **13. Proyectar el mes y decidir.** Conversaciones al mes por ejecuciones promedio. Si la proyección pasa de cerca del 70% del tope del plan, usar VPS o filtrar los avisos de estado antes de n8n. Referencia de volumen: unas 375 conversaciones al mes desde anuncios (supuesto de la propuesta, a reemplazar con datos reales).
- [ ] **14. Demo a Malik** con su número como destinatario de prueba. Recoger ajustes.

## Fase 4 - Producción

- [ ] **15. Cerrar los pendientes de Malik:** anticipación para ceder una entrada, si el grupo se sienta junto, cada cuánto recordarle una derivación, dónde recibe los leads y qué mínimo basta para cotizar, y las 10 a 15 conversaciones reales (para calibrar el tono).
- [ ] **16. Elegir el hosting definitivo** según la medición. Malik paga y contrata a su nombre.
- [ ] **17. Token permanente** con usuario del sistema en el Business Manager.
- [ ] **18. Número real del bot:** número nuevo que no esté activo en WhatsApp ni WhatsApp Business. Registrarlo en la cuenta real "Casa Alma Liray", con método de pago en la cuenta de WhatsApp.
- [ ] **19. Revisar si hay que publicar la app de Meta** (política de privacidad, términos, borrado de datos, ícono y categoría).
- [ ] **20. Confirmar en los términos oficiales de Meta** que un bot de atención de un negocio con IA está permitido.
- [ ] **21. Respaldar los flujos** exportándolos en JSON.
- [ ] **22. Salida controlada:** una semana de monitoreo con revisión diaria de la hoja. Después, apuntar los anuncios, el sitio y las redes al número del bot.

## Fase 5 - Operación

- [ ] **23. Revisión semanal de conversaciones** en la hoja: dudas nuevas, respuestas flojas, derivaciones innecesarias. Actualizar la base de conocimiento.
- [ ] **24. Difusiones** (mensajes masivos): pendientes para una fase posterior. Requieren plantillas aprobadas por Meta y consentimiento previo.

---

## Dependencias con Malik

| Paso | Qué se necesita de Malik |
|---|---|
| 3 | Que su número reciba mensajes de prueba |
| 9 | Dónde recibe los leads y el mínimo para cotizar |
| 14 | Tiempo para la demo |
| 15 | Respuestas pendientes y conversaciones reales |
| 16 | Contratar el hosting a su nombre |
| 18 | Un número nuevo para el bot y el método de pago en la cuenta de WhatsApp |
