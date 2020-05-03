# State como un Objeto

Dado que la función setter devuelta por useState sobrescribirá el estado cada vez que se llame, funciona de manera diferente al *this.setState* basado en Clase.

Recordar que *this.setState* fusionaría superficialmente el objeto que se pasó, en el estado existente, teniendo cuidado de no afectar las otras cosas de allí.

El setter *useState*, en cambio, afectará todo. Reemplaza todo el valor con lo que se ingrese. Aquí hay un ejemplo donde el estado es un objeto con un par de valores:

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const MultiCounter = () => {

    const [counts, setCounts] = useState({
    countA: 0,
    countB: 0
    });

    const incA = () => (
        setCounts(counts => ({
            ...counts,
            countA: counts.countA + 1
        }))
    );
    
    const incB = () => (
        setCounts(counts => ({
            ...counts,
            countB: counts.countB + 1
        }))
    );
    
    const badIncA = () => (
        setCounts({
            countA: counts.countA + 1
        })
    );

    return (
    <>
        <div> A: {counts.countA} </div>
        <div> B: {counts.countB} </div>
        <button onClick={incA} > Incrementar A </button>
        <button onClick={incB} > Incrementar B </button>
        <button onClick={badIncA} > Incrementar A mal </button>
    </>
);

}

ReactDOM.render(
    <MultiCounter /> ,
    document.querySelector('#root')
);
```

Reescribir este ejemplo y ver cómo funciona. Hacer clic en "Incrementar A" varias veces y en "Incrementar B" varias veces. Luego intentar "Incrementar A mal".

La conclusión aquí es que si el estado es un valor complejo como un objeto o array, debe tenerse cuidado, al actualizarlo, para copiar todas las otras partes que no tiene intención de cambiar. El operador **...** es de gran ayuda para hacer copias de arrays y objetos.