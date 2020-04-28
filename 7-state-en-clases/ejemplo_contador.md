# Ejemplo inicial: un contador

Aquí hay un componente Padre que contiene un componente Hijo. Parent pasa una función que Child llama cada vez que se hace clic en un botón:

```js
function handleAction(event) {
    console.log('Child did:', event);
}

function Parent() {
    return (
        <Child onAction={handleAction} />
    );
}

function Child({ onAction }) {
    return (
        <button onClick={onAction} >Click Me!</button>
);
}
```

¿Qué pasaría si quisiéramos que Parent hiciera un seguimiento de cuántas veces se hizo clic en el botón? En otras palabras, Parent debe realizar un seguimiento de cuántas veces se llama a la función handleAction.

Para hacer esto, Parent debe recordar el conteo usando el state y mantener ese estado entre los render.
Que el estado inicial del contador sea 0, una forma de incrementar el contador y una forma de mostrar el recuento actual. Además, cada vez que cambie el recuento, volver a procesar la aplicación para mostrar el último recuento.

React tiene 2 formas de agregar estado a los componentes. La primera es reescribir el componente como una clase. Los componentes de clase han podido mantener el estado desde las primeras versiones de React, y cada versión de React admite clases.

La segunda forma, más "moderna", es usar *hooks* para agregar estado directamente a un componente de función. Se agregaron **Hooks** a React en la versión 16.8.

Aunque los Hooks son lo "último y mejor", las clases no están en desuso. Las clases aún son compatibles, y es bueno comprender ambos estilos, especialmente si se trabajará con código que ha existido por un tiempo, como el que probablemente se vería en una empresa con una aplicación React preexistente con versión de React por debajo de la 16.8.

Esta sería la versión de Parent, renombrada como CountingParent y convertida en una clase.

```js
class CountingParent extends React.Component {

    // Se llama al constructor cuando un
    // componente es creado
    constructor(props) {
        super(props);

        // Establece el estado aquí. Usar "props" si es necesario.
        this .state = {
            actionCount : 0
        };

        // Enlazar función del controlador de eventos, 
        // para que el enlace `this` no se pierda cuando 
        // se pasa al botón
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(action) {
        console.log('Child says', action);
        // Reemplazar actionCount con un valor incrementado
        this .setState({
            actionCount: this.state.actionCount + 1
        });
    }

    render() {
        return (
            <div>
            <Child onAction={this.handleAction} />
            <p> Clicked {this.state.actionCount} veces </p>
            </div>
        );
    }
}
```

El componente Child no tiene que cambiar en absoluto. Probar, clic en el botón y verlo aumentar.

Bien. Cuando el componente se crea por primera vez, su estado inicial se establece en el constructor. (Más adelante, ver cómo escribir una clase sin necesidad del constructor)

Después, al hacer clic en el botón, según lo ordenado. Se llama al controlador (handler) onClick del botón. En este caso, esa es la prop **onAction**, que finalmente llama a la función handleAction en CountingParent. La función handleAction registra un mensaje y luego llama a **this.setState** con un objeto que describe el nuevo estado.

La función setState actualizará el estado y luego volverá a representar el componente y todos sus elementos hijos. Entonces, esto es lo que sucede a continuación: se llama a la función render de CountingParent, que revisa this.state.actionCount, que ahora se ha incrementado a 1 ó 2, o algún otro número si ha sido clickeado con ese botón.

Cada instancia de un componente tiene su propio estado. Si tiene más de un componente CountingParent en la página, cada uno tendrá su propio contador que comienza en 0 y se incrementa independientemente de los demás. Puede probarse creando un componente que contenga algunos CountingParents:

```js
const Page = () => (
    <div>
    <CountingParent/>
    <CountingParent/>
    <CountingParent/>
    </div>
);
```

Probar y asegurar actualizar la llamada ReactDOM.render para representar Page en lugar de un CountingParent. Y hacer clic en esos botones, observar cómo cambian los contadores de forma independiente.