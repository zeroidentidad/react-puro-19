# Patrón "Render Props"

El contexto de Consumer espera que su hijo sea una función única. Esto se llama patrón "render props":

```js
<UserContext.Consumer>
    {user => (
        <div> {user.name} </div>
    )}
</UserContext.Consumer>
```

El nombre "render props" proviene de la idea de que una de las props que se está pasando (prop de children, en este caso) es una función que se llama para renderizar el resultado.

Esta sintaxis se verá extraña si no se está acostumbrado. Si se observa, la función de flecha dentro de las llaves *{user => (...)}* es una expresión de JavaScript, el mismo tipo que se ha visto entremezclado con JSX en repetidas ocasiones.

Observar también que la prop de función de render no se llama de inmediato. Esto retrasa la ejecución hasta que *UserContext.Consumer* decida llamar a esa función, lo que significa que puede "esperar" hasta que user esté disponible.

El patrón de render props es bueno porque permite indicar: "Sé lo que quiero renderizar aquí, pero todavía no tengo todos los datos". Pasar esa función permite decidir cuál será la salida, pero permite que el componente (UserContext.Consumer en este caso) decida cuándo y dónde representar esa salida.

El Consumer llamará a su función en el momento de representación (render), pasando el valor que obtuvo del Provider en algún lugar por encima (o el valor predeterminado del contexto, o indefinido).

Si se olvida pasar una función hija al Consumer y, en su lugar, se pasa JSX regular, se recibirá un error que dice "render is not a function".

Si se necesita envolver el contenido con algún otro elemento, colocar esos elementos de envoltura afuera y alrededor del Consumer, en lugar de adentro. No hay que preocuparse de que el Consumer presente alguna división de envoltura ni nada. Es invisible en lo que respecta a la estructura DOM.

## Provider acepta un valor

Provider toma solo un valor único, como la prop *value*. El valor puede ser cualquier cosa. En la práctica, si se desea pasar varios valores hacia abajo, se creará un objeto con todos los valores y lo transmitirá.

Eso es prácticamente lo esencial de la API Context.