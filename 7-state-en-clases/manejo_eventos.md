# Manejo de eventos

Se ha visto algunos componentes que tienen una prop *onClick*. Esta es solo una de los muchos eventos que los componentes React pueden manejar. De hecho, los componentes React pueden responder a cada evento que los elementos HTML antiguos pueden, en su mayor parte.

La convención es que los eventos de React se nombran con camelCase como **onClick**, **onSubmit**, **onKeyDown** ... mientras que los eventos HTML están en minúsculas (onclick, onsubmit, onkeydown). React advertirá si se usa la capitalización incorrecta:

    - Warning: Unknown event handler property onclick. Did you mean ‘onClick‘?

Al menos un evento difiere en algo más que las mayúsculas: **ondblclick** cambia su nombre a **onDoubleClick**. Se puede encontrar una lista completa de eventos en la [doc oficial de React](https://reactjs.org/docs/events.html).

Su función de controlador de eventos recibirá el objeto de evento, que se parece mucho a un evento de navegador nativo. Tiene las funciones estándar **stopPropagation** y **preventDefault** si se necesita evitar el efecto burbuja o cancelar el envío de un formulario, por ejemplo. Sin embargo, en realidad no es un objeto de evento nativo, es un evento sintético (SyntheticEvent).

El objeto de evento pasado a una función de controlador solo es válido en ese momento. El objeto SyntheticEvent se agrupa para su funcionamiento. En lugar de crear uno nuevo para cada evento, React reemplaza el contenido de una sola instancia.

Si se imprime con console.log(event), la instancia registrada en la consola se borrará para cuando se vea. Sí, incluso si se mira de inmediato. Tampoco se puede acceder a este de forma asincrónica (por ejemplo, después de un tiempo de espera o después de una actualización de estado).

Si se necesita acceder a un evento de forma asincrónica, llamar a event.persist() y React lo mantendrá disponible.