# Sintaxis limpia en Class Components

En sección de tema anterior se menciono que las clases se pueden escribir sin un constructor. Se verá cómo funciona esto.

Aqui con el mismo ejemplo de antes, del componente CountingParent reescrito sin un constructor:

```js
class CountingParent extends React.Component {
    // inicializar state con una propiedad inicializadora
    // se puede acceder usando this.props de ser necesario
    state = {
        actionCount: 0
    };
    
    // escribir el handler como una función de flecha
    // significa que retendrá el valor adecuado de
    // `this`, para poder evitar el tener que vincularlo (bind)    
    handleAction = (action) => {
        console.log('Child says', action);

        // Reemplazar actionCount con un valor incrementado
        this.setState({
            actionCount: this.state.actionCount + 1
        });
    }
    
    render() {
        return (
            <div>
                <Child onAction={ this.handleAction} />
                <p> Clicked { this.state.actionCount} veces </p>
            </div>
        );
    }
}  
```

El constructor desapareció y, en su lugar, se usa inicializadores de propiedades para inicializar el estado y crear la función handleAction.

Esto ahorra algunas líneas de código repetitivo y hace que la clase sea más fácil de leer.

La sintaxis del inicializador de propiedades es algo reciente, casi o menos de 1 año, (2019-2020), pero ya se usa ampliamente en la comunidad React y ha sido respaldada por Babel y Create React App hace tiempo. A lo que se consideraría seguro de usar.