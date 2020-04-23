# Comunicación con componentes Padre

Si no se pueden cambiar las props, pero se necesita comunicar algo a un componente padre, ¿cómo funciona?

Si un hijo necesita enviar datos a su padre, el padre puede enviar una función como prop, de esta manera:

```js
function handleAction(event) {
    console.log('Child did:', event);
}

function Parent() {
    return (
        <Child onAction={handleAction} />
    );
}
```

El componente Child recibe la prop onAction, que puede llamar siempre que se necesite enviar datos o notificar a los padres que algo sucedió.

Un lugar donde es común pasar funciones como props es manejando eventos. Por ejemplo, el elemento del botón incorporado acepta una prop onClick, que se llamará cuando se haga clic en el botón.

```js
function Child({ onAction }) {
    return (
        <button onClick={onAction} />
    );
}
```

Se verá más sobre el manejo de eventos más adelante.