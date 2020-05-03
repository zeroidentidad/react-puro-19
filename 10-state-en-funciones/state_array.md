# State como un Array

El estado puede contener cualquier valor que se desee. Aquí un ejemplo de una lista de números aleatorios. Al hacer clic en el botón, se agrega un nuevo número aleatorio a la lista:

```js
function RandomList() {
    const [items, setItems] = useState([]); // array vacio
    
    const addItem = () => {
        setItems([
            ...items,
            {
                id : items.length,
                value : Math.random() * 100
            }
        ]);
    };
        
    return (
    <>
        <button onClick={addItem} > Agregar numero </button>
        <ul>
            {items.map(item => (
                <li key={item.id} > {item.value} </li>
            ))}
        </ul>
    </>
);
}
```

Observar que se esta inicializando el estado en un array vacio [], y dar vistazo a la función addItem.

La función de actualización de estado (setItems, aquí) no "fusiona" los valores nuevos con los antiguos, sino que sobrescribe el estado con el nuevo valor. Esta es una desviación de la forma en que this.setState funcionaba en las clases.

Entonces, para agregar un elemento al array, se esta utilizando el operador de propagación ES6+ **...** para copiar los elementos existentes en el nuevo array e insertar el nuevo elemento al final.