# Actualizar State basado en State anterior

Con otro ejemplo: actualizar el valor del estado en función del valor anterior.

Se creará un "seguidor de pasos". Facil de usar. Como un Fitbit. Cada vez que se de un paso, simplemente hacer clic en el botón. Al final del día, dirá cuántos pasos fueron.

```js
import React, { useState } from 'react';

function StepTracker() {
    const [steps, setSteps] = useState(0);
    
    function increment() {
        setSteps(steps => steps + 1);
    }

    return(   
    <div>
        Hoy has realizado {steps} pasos
        <br />
        <button onClick={increment} > Di otro paso </button>
    </div>
    );
}

ReactDOM.render(
    <StepTracker /> ,
    document.querySelector('#root')
);
```

Esta vez se importo useState directamente de React, para no tener que escribir React.useState.

Primero, se esta creando un nuevo estado llamando a useState, inicializándolo a 0. Devuelve el valor actual de los pasos (0) y una función para actualizarlo (setSteps). Se tiene una función de incremento para aumentar el contador de pasos.

Notar que se esta usando la forma funcional o "actualizador" de setSteps aquí. Se podría llamar a setSteps(steps + 1) directamente y funcionaría igual, pero se quería mostrar la forma de actualización, porque será útil en caso de que la actualización esté ocurriendo en una funcion encerrada (closure) que se ha cerrado durante el valor antiguo (obsoleto) del estado. El uso de la forma de actualización garantiza que se esté operando con el último valor de estado.

Otra cosa que se ha hecho es extraer la función de incremento, en lugar de incluir la función de flecha en la prop onClick del botón. Se podría haber escrito el botón de esta manera y hubiera funcionado igual:

```js
<button onClick={() => setSteps(steps => steps + 1)} >
Di otro paso
</button>
```