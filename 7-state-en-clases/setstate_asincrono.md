# setState es Asincrónico

En el ejemplo anterior del contador en parte se mintio un poco. Se supuso que la función setState actualizaría de inmediato el estado y llamaría a render. Eso no es realmente lo que sucede. La función setState es realmente asíncrona.

Si se llama a setState e inmediatamente console.log(this.state) justo después, es muy probable que imprima el estado anterior en lugar del que se acaba de configurar.

```js
// Asumir que el estado es { count: 3 }
// Luego llamar setState:
this.setState({ count: 4 });

// Luego intentar imprimir el estado "nuevo":
console.log(this.state);

// Es probable que imprima { count: 3 }
// en vez de { count: 4 }
```

Si se necesita establecer el estado e inmediatamente actuar sobre ese cambio, se puede pasar una función de devolución de llamada (callback) como segundo argumento para setState, así:

```js
this .setState({name : 'Zero'}, function () {
    // llamado después de que el estado ha sido actualizado
    // y el componente se ha vuelto a representar
    // this.state ahora contiene { name: 'Zero' }
});
```

## setState funcional

Otra forma de hacer que las actualizaciones de estado secuenciales se ejecuten en secuencia es usar la forma funcional de setState, como esta:

```js
this .setState((state, props) => {
    return {
        value : state.value + 1
    }
});
```

De esta forma, se pasa una función a setState en lugar de un objeto. La función recibe el estado actual y las props como argumentos, y se espera que devuelva un objeto, que se fusionará con el estado anterior. Si se tuviera que ejecutar algunos de estos secuencialmente **...**

```js
this.setState((state, props) => {
    return {
        value: state.value + 1
    }
});

this.setState((state, props) => {
    return {
        value: state.value + 1
    }
});

this.setState((state, props) => {
    return {
        value: state.value + 1
    }
});    
```

Esto funcionaría como se espera, eventualmente incrementando el valor en 3.

Porque cada llamada a setState "pone en cola" una actualización en el orden en que se llama, y cuando se ejecutan, reciben el último estado como argumento en lugar de usar un this.state potencialmente obsoleto.

Un beneficio adicional para el estilo funcional de setState es que las funciones de actualización de estado pueden extraerse de la clase y reutilizarse porque son funciones "puras", es decir, solo operan en sus argumentos, no modifican los argumentos y devuelven un nuevo valor. Una función "pura" no tiene efectos secundarios, lo que significa que llamarla varias veces con los mismos argumentos siempre devolverá el mismo resultado.

setState funcional es la forma preferida de llamar a setState porque está garantizado que funciona correctamente, siempre.

Pasar un objeto a setState funciona bien la mayor parte del tiempo, pero es casi como jugar con fuego. Esta bien hasta que uno se quema y luego se pasen alrededor 30 minutos tratando de descubrir por qué el estado no se está actualizando.