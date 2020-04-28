# Fusión superficial vs profunda

Cuando se llama a this.setState, ya sea que se llame con un objeto o en forma funcional, el resultado es que fusionará superficialmente las propiedades de su objeto con el estado actual. Así es como funciona esto.

Por ejemplo... Digamos que se comienza con un estado como este:

```js
{
    score: 7,
    user: {
        name: "somebody",
        age: 26
    },
    products: [ /*...*/ ]
}    
```

Después de ejecutar this.setState({score: 42}), el nuevo estado será:

```js
{
    score: 42, // new!
    user: { // unchanged
    name: "somebody", // unchanged
    age: 26 // unchanged
    },
    products: [ /* unchanged */ ]
}    
```

Es decir, combina el objeto que pasa a setState (o devuelve de la versión funcional) con el estado existente. No borra el estado existente, y no reemplaza todo el estado de nivel superior con su objeto.

Si, en su lugar, se ejecuta this.setState({user: {age: 4}}), reemplazaría todo el objeto *user* con el nuevo:


```js
{
    score: 7, // unchanged
    user: { // new!
    age: 4 // no 'name'
    },
    products: [...], // unchanged
}   
```

Una fusión "profunda" se muestra en el objeto de *user* y solo actualiza su propiedad de *age*, dejando el resto perdido. Una fusión "superficial" sobrescribe todo el objeto *user* con el nuevo pero no reemplazará el estado de nivel superior, y solo actualizará un nivel de profundidad.