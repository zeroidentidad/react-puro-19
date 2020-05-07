# Qué es un Reducer?

La palabra "reducer" evoca ideas de Redux para muchos, pero no se tiene que entender Redux para usar el hook useReducer.

Antes de analizar cómo se puede aprovechar useReducer para administrar estado complejo en los componentes, se dejará una definición sobre qué es un reducer.

Un "reducer" es una palabra elegante para una función que toma 2 valores y devuelve 1 valor.

Si se tiene un array de cosas y se desea combinar esas cosas en un solo valor, la forma de "programación funcional" de hacerlo es usar la función *reduce* de Array. Por ejemplo, si se tiene una serie de números y se desea sumarlos todos juntos, se puede escribir una función reductora y pasarla a reducir, de esta manera:

```js
const adder = (total, number) => {
    return total + number;
};

let numbers = [1 , 2 , 3];
let sum = numbers.reduce(adder, 0);
```

La función *adder* aquí se llama *reducer*.

Si no se ha visto esto antes, puede parecer un poco críptico. Lo que esto hace es llamar al sumador (adder) para cada elemento de la matriz, pasando el total anterior y el elemento actual como número. Lo que devuelva se convierte en el nuevo total. El segundo argumento para reducir (0 en este caso) es el valor inicial para el total. En este ejemplo, la función proporcionada para reducir (adder, alias la función "reducer") se llamará 3 veces:

• Llamado con (0, 1), devuelve 1.
• Llamado con (1, 2), devuelve 3.
• Llamado con (3, 3), devuelve 6.

*reduce* devuelve 6, que se almacena en *sum*.

## Pero, ¿qué hay de useReducer?

En referencia a lo anterior sobre la función reduce de Array, *useReducer* toma los mismos argumentos, y básicamente funciona de la misma manera. Se pasa una función reductora (reducer) y un valor inicial (state inicial). Su reductor recibe el estado actual y una acción (action), y devuelve el nuevo estado. Se podría escribir uno que funcione igual que el reductor de suma:

```js
useReducer((state , action) => {
    return state + action;
}, 0) ;
```

Entonces ... ¿qué desencadena esto? ¿Cómo llega *action* allí?

*useReducer* devuelve un array de 2 elementos, similar al hook *useState*. El primero es el estado actual y el segundo es una función de envío (dispatch). Así es como se ve en la práctica:

```js
const [sum , dispatch] = useReducer((state , action) => {
    return state + action;
}, 0) ;
```

Notar cómo el "state" puede ser cualquier valor, igual que con useState. No tiene que ser un objeto. Podría ser un número, un array o cualquier otra cosa.

Ejemplo completo de un componente que usa el reducer para incrementar un número:

```js
import React, { useReducer } from 'react';

function Counter() {
    // Primero render creará el estado, y lo hará
    // persistir en futuros renders
    const [sum, dispatch] = useReducer((state, action) => {
        return state + action;
    }, 0);
    
    return (
        <>
        {sum}
        <button onClick={() => dispatch(1)} >
        Sumar 1
        </button>
        </>
    );
}        
```

Si se prueba puede verse cómo al hacer clic en el botón se despacha una acción con un valor de 1, que se agrega al estado actual, y luego el componente se vuelve a renderizar con el nuevo estado (de tamaño aumentado).

Se esta mostrando un ejemplo donde "action" no tiene la forma {type: "INCREMENT_BY", value: 1} o alguna otra cosa similar, porque los reductores que se crean NO tienen que seguir los patrones típicos de Redux. El mundo de Hooks es un mundo nuevo: vale la pena considerar si aun se encuentran valiosos los patrones antiguos y se quieren conservar, o si se prefiere cambiar las cosas a esta alternativa actual.