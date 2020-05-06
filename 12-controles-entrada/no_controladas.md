# Entradas no controladas

Cuando una entrada no está controlada, esta gestiona su propio estado interno. Entonces se puede colocar una entrada en la página de esta manera (sin una prop *value*):

```js
const EasyInput = () => (
    <input type="text" />
);
```

Escribir, hacer cualquier cosa. Funciona normalmente.

Puede pasarse prop defaultValue, y el componente se inicializará con ese valor. Sin embargo, después de ese render inicial, si se necesita cambiar el valor, la mejor manera de hacerlo es convertirlo en una entrada controlada.

Cuando se desea obtener un valor, se tiene dos opciones.

Primero, se puede pasar una prop onChange y responder a los eventos. La desventaja de esto es que no se puede extraer fácilmente un valor a voluntad. Debe escucharse los cambios y realizar un seguimiento del "valor más reciente" en algún lugar, probablemente en el estado. Por lo tanto, no se hace mucho código sobre el uso de una entrada controlada.

## Refs

Alternativamente, se puede usar una referencia (**ref**). Una ref da acceso al nodo del DOM subyacente de la entrada, para que se pueda extraer su valor directamente.

En los componentes de función, se puede llamar al hook **useRef** para crear una referencia vacía y luego pasarla a una prop *ref* en la entrada.

Un ejemplo usando una ref en una entrada para extraer su valor cuando se hace clic en un botón:

```js
import React, { useRef } from 'react';

const RefInput = () => {
    const input = useRef();
    const showValue = () => {
        alert(`El input contiene: ${input.current.value}`);
    };
    
    return (
        <div>
        <input type="text" ref={input} />
        <button onClick={showValue} >
        Alert Value!
        </button>
        </div>
    );
};
```

La prop **ref** es especial. Pasarla como un objeto ref, y cuando el componente se monte, React guardará el nodo DOM (o la instancia del componente, si es un componente de clase) en la propiedad **current** de la ref.

Las referencias solo se pueden usar para referirse a elementos regulares (div, input, etc.) y componentes con estado (de clase). Los componentes de función no tienen una instancia de soporte, por lo que no hay forma de referirse a ellos. Eso no significa que no se pueda escribir componentes sin estado que usen ref, solo que no se puede adjuntar una prop de ref a un componente sin estado.

Sin embargo, el objeto devuelto por useRef es más que una forma de contener una referencia DOM. Puede contener cualquier valor específico para esta instancia de componente y persiste entre renders. Eso significa que useRef se puede usar para crear variables de instancia genéricas, tal como se puede hacer con un componente de clase con this.whatever = value.

Lo único es que asignar una ref cuenta como un "efecto secundario" para que no se pueda cambiar durante un renderizado, solo dentro del cuerpo de un hook useEffect.