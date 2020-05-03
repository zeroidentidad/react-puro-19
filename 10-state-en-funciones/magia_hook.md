# La "magia" de los Hooks

La extraña paradoja de almacenar información con estado en un componente de función aparentemente sin estado. Es el primer cuestionamiento a tener sobre hooks.

Y luego hay que saber algo sobre la regla de orden de llamada (los hooks deben llamarse en el mismo orden cada vez). Así es como funciona.

La primera vez que React representa un componente de función, crea un objeto para vivir junto a él, un objeto a medida para esa instancia de componente, no global. El objeto de este componente se mantiene mientras el componente exista en el DOM.

Usando ese objeto, React puede realizar un seguimiento de varios bits de metadatos que pertenecen a un componente.

Los componentes de React, incluso los funcionales, no son "auto-renderizados". No devuelven HTML directamente, y que en cambio devuelven una estructura de objeto que React puede convertir en nodos DOM.

Entonces, React tiene la capacidad de hacer alguna configuración antes de llamar a cada componente, y es entonces cuando configura este objeto para mantener el "state" detrás del escenario del componente.

Una de las cosas que hay aqui es un **"array de hooks"**. Que comienza vacío. Cada vez que se llama un hook, como useState, React agrega un elemento a ese array.

## Importancia en orden de llamadas

Suponiendo que se tiene este componente:

```js
function AudioPlayer() {
    const [volume, setVolume] = useState(80);
    const [position, setPosition] = useState(0);
    const [isPlaying, setPlaying] = useState( false );
    // < retornar algo >
}
```

Como se llama a useState 3 veces, React pondría 3 entradas en el array de hooks en el primer render.

La próxima vez que se renderice este componente, esos mismos 3 hooks se invocan en el mismo orden a menos que se modifice el orden de declaracion/inicializacion. React puede examinar el array y decir que ya tiene un hook useState en la posición 0, así que en lugar de crear un nuevo estado, devolverá el existente".

Así es como React es capaz de crear y mantener el estado a través de múltiples llamadas a funciones, incluso cuando las variables mismas están fuera de alcance cada vez.

## Paso a paso de múltiples llamadas a useState

Explicación desarrollada en detalle. En el primer render:

1. React acaba de crear el componente. No ha llamado a la función todavía. Crea el objeto de metadatos y el array vacio de hook. Imaginar que el objeto tiene una propiedad llamada nextHook y se establece en 0. El primer hook que se ejecute consumirá la posición 0.

2. React llama al componente (lo que significa que sabe en qué objeto de metadatos almacenar los hooks).

3. Se llama a useState. React crea un nuevo estado, lo coloca en la posición 0 del array de hooks y devuelve la pareja [volume, setVolume] con volume establecido a su valor inicial de 80. También incrementa el índice nextHook a 1.

4. Se llama a useState nuevamente. React revisa la posición 1 del array, ve que está vacía y crea un nuevo estado. Luego incrementa el índice nextHook a 2, y devuelve [position, setPosition].

5. Se llama a useState por tercera vez. React observa que la posición 2 no está ocupada, crea el estado, incrementa nextHook a 3 y devuelve [isPlaying, setPlaying].

Ahora el array de hooks tiene 3 elementos, y el renderizado está terminado. ¿Qué pasa en el próximo render?

1. React necesita volver a representar el componente. React ha visto este componente anteriormente y ya tiene el objeto de metadatos asociado.

2. React restablece el índice nextHook a 0 y llama al componente.

3. Se llama a useState. React revisa el array de hooks en el índice 0 y ve que ya tiene un hook en ese espacio. No es necesario crear uno. Por lo tanto, avanza nextHook para indexar 1 y devuelve [volume, setVolume] con el volumen aún establecido en 80.

4. Se llama a useState nuevamente. Esta vez, nextHook es 1, por lo que React verifica el índice 1 del array; de nuevo, ya existe un hook, por lo que incrementa nextHook y devuelve [position, setPosition].

5. Se llama a useState por tercera vez. Y ya se sabe lo que pasa ahora.

Eso es todo. No es magia en verdad; pero se basa en que algunas cosas sean ciertas.

Técnicamente, el "array de hooks" se implementa como una lista vinculada dentro de React. Si ya se sabe cómo funcionan, pues super. Si no, pues tener en cuenta y no olvidar del todo.