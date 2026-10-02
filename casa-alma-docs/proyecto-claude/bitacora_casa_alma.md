# Casa Alma - Bitácora del proyecto

Cliente fundador. Última actualización: 2 de octubre de 2026.

## Estado actual
- Propuesta del 28 de septiembre aceptada, plan Inicio.
- API oficial de WhatsApp conectada con número de prueba. El número real del bot aún no está conectado.
- Brief, base de conocimiento y guía de estilo del bot redactados. Faltan datos de Malik (ver pendientes).

## Decisiones tomadas

| Fecha | Decisión | Motivo |
|---|---|---|
| 2-oct-2026 | Fase 1 del bot: responder preguntas frecuentes, enviar links de compra y derivar a Malik. Para eventos privados, conversar y entregar el resumen del lead. | Alcance acotado para partir y medir. |
| 2-oct-2026 | Derivación opción 1: aviso a Malik por WhatsApp (+56 9 6753 2727) con resumen y link, y el bot se pausa en esa conversación. | La coexistencia exige ser Tech Provider o Solution Partner de Meta. |
| 2-oct-2026 | Todos los mensajes se registran en una hoja de Google con acceso de lectura para Malik. | La API no tiene bandeja propia. Sirve para auditar y mejorar el bot. |
| 2-oct-2026 | Disponibilidad de fechas: el bot lee la lista pública de productos de la tienda (disponible o agotado). | No requiere acceso de administrador. |
| 2-oct-2026 | "Ley espejo": el bot adapta su estilo al del cliente dentro de los límites de la marca. | Mejor experiencia y sensación de cercanía. |
| 2-oct-2026 | El bot usará un número distinto al publicado en el sitio. El cambio se resuelve después. | Pendiente de coordinar. |
| 2-oct-2026 | No se permiten mascotas, ni en las experiencias ni en los eventos privados. | Confirmado por Malik. |
| 2-oct-2026 | Entradas sin devolución ni cambio de fecha, pero se pueden ceder a otra persona. | Política definida por Malik. |
| 2-oct-2026 | Las difusiones (mensajes masivos) quedan pendientes para una fase posterior. | Fuera del alcance de la fase 1. |
| 2-oct-2026 | Malik paga el hosting de n8n. Antes de decidir el plan, se prueba en la prueba gratuita de n8n Cloud. | Medir flujo y volumen real. |
| 2-oct-2026 | Si Casa Alma cambia o suspende una fecha, el cliente elige entre nueva fecha o devolución. | Política definida por Malik. |
| 2-oct-2026 | Si el precio de eventos privados se muestra completo o como "desde" se decide en el rediseño web. | Decisión de Malik. |

## Pendientes con Malik
1. Anticipación y forma de ceder una entrada, y si el grupo se sienta junto.
2. Cada cuánto tiempo recordarle una derivación sin respuesta.
3. Dónde recibe el resumen de leads y qué mínimo de datos basta para cotizar (propuesta: tipo de evento, fecha, invitados, formato y nombre).
4. 10 a 15 conversaciones reales (sin datos personales) de Instagram o WhatsApp.
5. Acceso de partner al Business Manager y a la cuenta publicitaria.
6. Quién es el dueño del dominio y de Shopify.
7. Texto de "sin devolución ni cambio de fecha, pero se puede ceder la entrada" visible en el sitio antes de pagar (validar con un abogado o SERNAC).

## Próximos pasos (7 días)
1. Subir los archivos al proyecto.
2. Armar el flujo en n8n: recepción del mensaje, registro, lectura de disponibilidad, respuesta con la base de conocimiento y la guía de estilo, derivación.
3. Probar los 10 casos de la guía de estilo con el número de prueba.
4. Auditar la cuenta de Meta Ads: exportar los últimos 90 días y definir qué campañas pausar.
5. Revisar el píxel de Meta y definir enlaces con UTM.

## Línea base (para demostrar resultados después)
Registrar estos datos **antes** de cambiar nada:
- Gasto mensual actual en anuncios.
- Costo por conversación de WhatsApp (referencia de la propuesta: ~$800).
- Entradas vendidas por fecha, sobre ~40 cupos.
- Conversaciones de WhatsApp al mes y cuántas terminan en venta.
- Consultas de eventos privados al mes y cuántas se cotizan.
- Tiempo de respuesta actual a los mensajes.

## Contrapartidas del piloto
- Autorización para usar el proyecto como caso de estudio.
- Un testimonio después de un par de meses de trabajo.
- Acceso a los datos del proyecto para portafolio. Conviene dejar por escrito qué datos se pueden publicar y cuáles se anonimizan.

## Acuerdo del rediseño web (sin costo)
Está fuera del contrato. Conviene formalizarlo por escrito: alcance (páginas), cantidad de rondas de cambios, fecha estimada y quién entrega los textos y fotos. Sin eso, un trabajo gratuito tiende a crecer.

## Aprendizajes para la plantilla de futuros clientes
- Anotar el permiso exacto que se pide al cliente para acceder al caso de uso de WhatsApp en Meta.
- Dejar claro por escrito, desde la propuesta, quién paga el hosting de n8n, la IA y la API de WhatsApp.
- Pedir desde el inicio las respuestas a las preguntas frecuentes y 10 a 15 conversaciones reales.
- Verificar los requisitos de WhatsApp antes de prometer funciones: la coexistencia exige ser Tech Provider o Solution Partner.
- Dejar las cuentas a nombre del cliente desde el primer día.
- Revisar la lista pública de productos de Shopify: sirve para la disponibilidad sin pedir acceso de administrador.
- Avisar en el primer mensaje del bot que es un asistente virtual y que la conversación queda registrada.
- Anotar el tiempo que toma cada tarea para calcular precios de los próximos clientes.

## Estado técnico (según el chat del chatbot, 2 de octubre de 2026)
- **Meta:** portfolio comercial "Casa Alma" (razón social UPSCALE SPA) con verificación de empresa exitosa. App de Meta "N8N-Casa-Alma" en modo desarrollo, con los permisos de mensajería y gestión de WhatsApp listos para pruebas.
- **Cuentas de WhatsApp:** una de prueba (con el número de prueba de Meta) y la real "Casa Alma Liray", todavía sin número registrado. Los IDs están en el chat del chatbot.
- **n8n:** instancia de prueba en n8n Cloud. Flujo publicado y funcionando de punta a punta: recibe el mensaje, descarta los avisos de estado y responde con un eco.
- **Acceso de Vicente al portfolio:** parcial, solo a los activos asignados. No se anotó qué permiso exacto destrabó la pantalla del caso de uso. Anotarlo para la plantilla.

## Reglas técnicas descubiertas
- Meta admite una sola Callback URL por app y n8n un solo WhatsApp Trigger por app: todo el bot vive en un único flujo de entrada.
- Con el flujo publicado, "Execute step" no recibe mensajes. Para depurar hay que despublicar.
- Cada aviso de estado (hasta 3 por mensaje enviado) cuenta como ejecución en n8n aunque el filtro lo descarte.
- El token temporal dura unas 24 horas. Hay que pasar a un token permanente con usuario del sistema.
- El número de prueba solo envía a hasta 5 destinatarios agregados: agregar el de Malik para probar la derivación.
- El número real no debe estar activo en WhatsApp ni en WhatsApp Business.
- Política de Meta sobre IA: desde el 15 de enero de 2026 prohíbe los asistentes de IA de propósito general en la API, pero permite bots de atención de un negocio. Casa Alma entra en lo permitido. Fuente secundaria: confirmar en los términos oficiales de Meta.

## Costos de infraestructura (cifras del chat, revalidar)

| Opción | Precio | Límite |
|---|---|---|
| n8n Cloud Starter | 20 €/mes (pago anual) | 2.500 ejecuciones |
| n8n Cloud Pro | 50 €/mes (pago anual) | 10.000 ejecuciones |
| Hostinger VPS KVM 1 | desde 6,49 US$/mes | sin tope, mantención propia |
| Hostinger VPS KVM 2 | desde 8,99 US$/mes | sin tope, mantención propia |

- Un lead completo gasta entre 15 y 25 ejecuciones.
- Estimación propia: cada mensaje del cliente que el bot responde gasta unas 4 ejecuciones (1 del mensaje y hasta 3 de avisos de estado de la respuesta). Con Starter alcanzan unos 600 intercambios al mes.
- Decisión pendiente: n8n Cloud o VPS, después de la prueba gratuita. Malik paga y contrata a su nombre.
- Meta: desde el 1 de octubre de 2026 los primeros 1.000 mensajes de servicio por número al mes son gratis (según el chat). Las plantillas se cobran por mensaje, incluido el aviso a Malik.

## Pendientes técnicos
1. Conectar la disponibilidad desde la lista pública de productos de Shopify.
2. Registro de todos los mensajes en una hoja de Google.
3. Derivación a Malik: plantilla de aviso aprobada por Meta, pausa del bot y recordatorio.
4. Transcripción de audios.
5. Agente de IA para consultas abiertas y leads, con la guía de estilo.
6. Token permanente con usuario del sistema.
7. Registrar el número real, con método de pago en la cuenta de WhatsApp.
8. Publicar la app de Meta (política de privacidad, términos, borrado de datos, ícono y categoría).
9. Elegir n8n Cloud o VPS.
10. Respaldar los flujos exportándolos en JSON.

## Prueba gratuita de n8n Cloud: qué medir
Objetivo: decidir con datos si n8n Cloud alcanza o conviene un VPS.

1. Antes de empezar, anotar cuándo termina la prueba y cuál es su tope de ejecuciones (verlo en la cuenta de n8n).
2. Correr las pruebas: los 10 casos de la guía de estilo, 3 leads de eventos privados completos, 5 consultas de disponibilidad y algunos audios.
3. En Executions, anotar cuántas ejecuciones gasta cada tipo de interacción y cuántas son avisos de estado:
   - Consulta simple respondida por el bot.
   - Consulta con lectura de Shopify.
   - Lead completo (referencia del chat: 15 a 25).
4. Proyectar el mes: conversaciones al mes por ejecuciones promedio.
5. Regla de decisión: si la proyección supera cerca del 70% del tope del plan, usar VPS o filtrar los avisos de estado antes de n8n.

**Ejemplo de proyección (supuestos propios, reemplazar con datos reales):** la pauta de referencia de $300.000 al mes y un costo de ~$800 por conversación dan unas 375 conversaciones al mes solo desde anuncios. Con 6 mensajes del cliente por conversación y ~4 ejecuciones por mensaje, son unas 9.000 ejecuciones al mes. Eso queda cerca del tope del plan Pro (10.000) y muy por encima del Starter (2.500).
