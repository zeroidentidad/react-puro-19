# Pensando declarativamente

Acostumbrarse a React implica cambiar la forma en que se resuelven ciertos tipos de problemas.

Pasar props a un componente (como si ese componente fuera una función pasando argumentos) tiene sentido con bastante rapidez. Y JSX se ve y funciona como HTML. Nuestros cerebros están acostumbrados a eso.

La idea de pasar datos y pasar eventos también tiene sentido bastante rápido, para casos simples. Es el patrón de "devolución de llamada" (callback), comúnmente utilizado en otros lugares, por lo que no es tan extraño. Pasar un controlador onClick a un botón es bastante normal.

¿Pero qué sucede cuando es hora de abrir un diálogo modal? ¿O mostrar una notificación emergente? ¿O animar un ícono en respuesta a un evento? Es posible descubrir, que estas cosas imperativas, "basadas en eventos" no vienen naturalmente en el mundo declarativo de React.

## Cómo desarrollar el pensamiento "declarativo"

Si se proviene de un marco o lenguaje en el que se llama principalmente a funciones para que las cosas sucedan en un cierto orden ("programación imperativa"), debe ajustarse el modelo mental para trabajar de manera efectiva con React. 

Algunos ejemplos o "patrones" para adaptarse.

### Expandir / contraer un control de acordeón

**La forma antigua:** al hacer clic en un botón de toggle, se abre o cierra el acordeón al llamar a su función de toggle. El acordeón sabe si está abierto o cerrado.

**La forma declarativa:** el acordeón se puede mostrar en el estado "abierto" o en el estado "cerrado", y almacenar esa información como un indicador dentro del estado del componente padre (no dentro del acordeón). Se indica al acordeón de qué manera de renderizar al pasar *isOpen* como prop. Cuando isOpen es verdadero, se muestra como abierto. Cuando isOpen es falso, se muestra como cerrado.

```js
<Accordion isOpen={true} />
// or
<Accordion isOpen={false} />
```

La mayor diferencia es que, en la forma declarativa de React, el estado de expandir/colapsar se puede almacenar fuera del acordeón y pasarse como prop. En lugar de que el Acordeón sepa directamente (e internamente) si está abierto o cerrado, se le indica que esté abierto o cerrado por cualquier componente que renderice el Acordeón.

### Abrir y cerrar un diálogo

**La forma antigua:** al hacer clic en un botón se abre la modal. Al hacer clic en el botón Cerrar, se cierra.

**La forma declarativa:** si la Modal está abierta o no, es un estado. Está en el estado "abierto" o en el estado "cerrado". Entonces, si está "abierto", renderizar la modal. Si está "cerrado" no renderizar la modal. Además, se puede pasar una devolución de llamada onClose a la Modal, de esta manera el componente principal decide qué sucede cuando el usuario hace clic en Cerrar.

```js
<div>
    { this.state.isModalOpen && 
    <Modal onClose={this.handleClose} /> }
</div>
```

### Notificaciones

**La forma antigua:** cuando ocurre un evento (como un error), llamar a una libreria de notificaciones para mostrar una ventana emergente, como toastr.error("¡Oh, no!").

**La forma declarativa:** pensar en las notificaciones como estado. Puede haber 0 notificaciones, o 1, o 2 ... Almacenarlas en un array. Colocar un componente NotificationTray en algún lugar cerca de la raíz de la aplicación y pasar los mensajes para mostrar. Se puede administrar el array de mensajes en el estado del componente raíz y pasar una prop addNotification a los componentes que necesiten poder mostrar notificaciones.

### Animando un cambio

Suponiendo que se tiene una insignia con un contador que muestra el número de usuarios registrados. Se obtiene este número de una prop. ¿Qué sucede si se desea que la insignia se anime cuando cambia el número?

**La forma antigua:** se puede usar jQuery para alternar una clase que reproduce la animación, o usar jQuery para animar el elemento directamente.

**La forma declarativa:** se puede responder cuando las props cambian implementando el método del ciclo de vida de componentDidUpdate y comparando el valor anterior con el nuevo. Si el valor cambió, puede establecerse el estado de "animación" en verdadero. Luego, en render, cuando "animar" es verdadero, establecer una clase CSS que active la animación. Cuando "animar" es falso, no establecer esa clase. Así es como se vería eso:

```js
class Badge extends Component {
    componentDidUpdate(oldProps) {
        if (this.props.counter !== oldProps.counter) {
            // Establecer `animating` en true ahora mismo.
            // Cuando finalice el cambio de estado, configurar temporizador
            // para desactivar la animación 200 ms después.
            this.setState({ animating: true }, () => {
                setTimeout(() => {
                    this.setState({ animating: false });
                    }, 200);
            });
        }
    }

    render() {
        const animatingClass = this.state.animating ? 'animating' : '';
        return (
            <div className={`badge ${animatingClass}`} >
            { this.props.counter}
            </div>
        );
    }
}
```

Tomará tiempo aprender nuevos patrones. Se convertirá en una segunda naturaleza una vez que se haga muchas veces implementar viejos patrones imperativos de manera declarativa.