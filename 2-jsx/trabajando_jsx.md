# Trabajando con JSX:

## Composición de componentes

JSX, como HTML, permite anidar elementos uno dentro de otro. Esto probablemente no sea gran sorpresa.

Refactorizando el componente HelloWorld de antes para demostrar cómo funciona la composición.

El HelloWorld original:

```js
function HelloWorld() {
return (
<div> Hello World! </div>
);
}
```

Dejando el componente HelloWorld intacto por ahora, crear dos componentes nuevos: uno llamado Hello y otro llamado World. Hola debería representar < span > Hola </ spa > y World debería representar < span > World </ span >. Básicamente, se puede copiar y pegar el componente HelloWorld y simplemente cambiar el texto y el nombre de la función.

Los dos nuevos componentes deberían verse así:

```js
function Hello() {
return <span> Hello </span> ;
}

function World() {
return <span> World </span> ;
}
```

Ahora, modificando el componente HelloWorld para usar los dos componentes nuevos. Debería verse más o menos así:

```js
function HelloWorld() {
return (
<div>
<Hello/> <World/> !
</div>
);
}
```

Suponiendo que la aplicación aún se esté ejecutando, la página debería actualizarse automáticamente.

### Envolver JSX con paréntesis 

Una nota rápida sobre el formato: puede notarse que se envolvio el JSX devuelto entre paréntesis, (). Esto no es estrictamente necesario, pero si deja de lado a los padres, la etiqueta de apertura debe estar en la misma línea que la devolución, lo que parece un poco incómodo:

```js
function HelloWorld() {
return <div>
<Hello/> <World/> !
</div> ;
}
```

Intentar mover el <div> a su propia línea, sin los parentes circundantes:

```js
function HelloWorld() {
return
<div>
<Hello/> <World/> !
</div> ;
}
```

Esto dará con un error. Si se mira en la consola del navegador, es probable que también se vea una advertencia sobre "No se devolvió nada del render".

Esto se debe a que JavaScript asume que quería un punto y coma después de ese retorno (debido a la nueva línea), convirtiéndolo efectivamente en esto, que devuelve indefinido:

```js
function HelloWorld() {
return ;
<div>
<Hello/> <World/> !
</div> ;
}
```

Entonces: se es libre de formatear JSX como quieras, pero si está en varias líneas, se recomienda que lo envuelvas entre paréntesis.

### Retornar un solo elemento

Observese cómo se envuelven los dos componentes en un < div > en el ejemplo HelloWorld:

```js
function HelloWorld() {
return (
<div>
<Hello/> <World/> !
</div>
);
}
```

Si intenta eliminar el contenedor < div >, vea qué sucede. Deberías obtener este error:

*Adjacent JSX elements must be wrapped in an enclosing tag.*

JSX se compila a JS antes de ejecutarse:

```js
// Este JSX:
function HelloWorld() {
return ( <Hello/> <World/> );
}

// Se convierte en este JS:
function HelloWorld() {
return (
React.createElement(Hello, null ) React.createElement(World, null )
);
}
```

Devolver dos cosas a la vez no funcionará. Entonces eso lleva a esta regla muy importante:

#### Una función componente debe devolver un solo elemento.

¡Pero! ¿Podría devolverse una arreglo? Es solo JavaScript después de todo ...

```js
// Este JSX:
function HelloWorld() {
return [ <Hello/> , <World/> ];
}

// Se convertiría en este JS
// (observar los corchetes).
function HelloWorld() {
return [
React.createElement(Hello, null ),
React.createElement(World, null )
];
}
```

Se procesa correctamente. Pero si se abre la consola del navegador, se verá una advertencia:

*Each child in an array or iterator should have a unique “key” prop.*

Como sugiere la advertencia, React requiere una propiedad key unica para cada elemento JSX en una matriz. Hay dos formas de resolver este problema: envolver los elementos en una sola etiqueta de cierre o envolverlos en un fragmento (React.Fragment).

### Envolver con una etiqueta

La forma más obvia de devolver múltiples elementos es envolverlos en una etiqueta adjunta, como un < div > o < span >. Sin embargo, tiene el efecto secundario de influir en la estructura DOM.

Por ejemplo, este componente...

```js
function HelloWorld() {
return (
<div>
<Hello/> <World/> !
</div>
);
}
```

... representará una estructura DOM como esta:

```html
<div>
<span> Hello </span>
<span> World </span>
</div>
```

Muchas veces, esto está perfectamente bien. Pero a veces, no se querra tener un elemento contenedor, como si tuvieras un componente que devuelve celdas de tabla:

```js
function NameCells() {
return (
<td> First Name </td>
<td> Last Name </td>
);
}
```

No se puede ajustar estos elementos en un < div >, porque las celdas de la tabla < td > deben ser descendientes directos de una fila de la tabla < tr >. ¿Cómo se puede combinar?

### Fragmentos

La respuesta de React es el fragmento. Este componente se agregó en React 16.2 y se puede usar así:

```js
function NameCells() {
return (
<React.Fragment>
<td> First Name </td>
<td> Last Name </td>
</React.Fragment>
);
}
```

Después de la representación, el componente React.Fragment "desaparecerá", dejando solo los elementos secundarios dentro de él, de modo que la estructura DOM no tendrá componentes de envoltura.

Los fragmentos facilitan la producción de HTML válido (como mantener elementos < td > directamente dentro de < tr > s), y mantienen la estructura DOM más plana, lo que facilita la escritura de HTML semántico (que también suele ser HTML más accesible).

### Sintaxis de Fragment

Si se cree que React.Fragment se ve verboso. Igual JSX admite una sintaxis especial que se parece a una "etiqueta vacía" y es mucho más agradable de escribir:

```js
function NameCells() {
return (
<>
<td> First Name </td>
<td> Last Name </td>
</>
);
}
```
Esta sintaxis <> </> es la forma preferida de escribir fragmentos, y esta función estará disponible mientras se trabaje en un proyecto con Babel 7+ y Create React App 2+

### JavaScript en JSX

Se puede insertar expresiones JavaScript reales dentro del código JSX y, de hecho, se hace con bastante frecuencia.  Se rodea JavaScript con llaves simples como esta:

```js
function SubmitButton() {
const buttonLabel = "Submit";
return (
<button> {buttonLabel} </button>
);
}
```

Esto se compilará en JavaScript, lo que significa que el JS dentro de las llaves debe ser una expresión. Una expresión produce un valor.

Cada uno de los resultados en un solo valor. Por el contrario, las declaraciones no producen valores y no se pueden usar dentro de JSX. Aquí hay algunos ejemplos de declaraciones:

```js
const a = 5
if ( true ) { 17; }
while (i < 7) { i ++ }
```

## “If” en JSX

La siguiente cuestion que podría haber es: ¿Cómo escribo un condicional si no puedo usar "if"? Hay un par de opciones.

El primero es el operador ternario (el signo de interrogación,?). Así:

```js
function ValidIndicator() {
const isValid = true ;
return (
<span> {isValid ? 'valid' : 'not valid'} </span>
);
}
```

También se puede usar operadores booleanos como && asi:

```js
function ValidIndicator() {
const isValid = true ;
return (
<span>
{isValid && 'valid'}
{!isValid && 'not valid'}
</span>
);
}
```

### Comentarios en JSX

Si se necesita colocar comentario en bloque de JSX, la sintaxis es un poco incómoda. Cualquier código JavaScript debe estar dentro de llaves simples, y pensar en los comentarios como JavaScript. Para comentar fragmentos de JSX, colocar los comentarios dentro de un bloque de JavaScript asi:

```js
function ValidIndicator() {
const isValid = true ;
return (
<span>
{/* here is a comment */}
{isValid && 'valid'}
{!isValid && 'not valid'}
{
// Double-slash comments are
// OK in multi-line blocks.
}
{/*
<span>thing one</span>
<span>thing two</span>
*/}
</span>
);
}
```

### Capitalizar nombre de componentes

Los componentes deben comenzar con una letra mayúscula. Esto significa usar nombres como UserList, Menu y SubmitButton, y no nombres como userList, menu y submit_button.

En JSX, se supone que un componente que comienza con una letra minúscula es un elemento HTML o SVG incorporado (div, ul, rect, etc.).

Las primeras versiones de React mantuvieron una "lista blanca" de todos los nombres de elementos integrados para que pudiera distinguirlos de los personalizados, pero mantener esa lista blanca consumía mucho tiempo y era propensa a errores. Si un nuevo elemento SVG se introdujo en la especificación, no podría usarse hasta que React actualice esa lista! Entonces eliminaron la lista y agregaron esta regla.

### Cerrar cada elemento

JSX requiere que todos los elementos estén cerrados, de forma similar a XML o XHTML. Esto incluye a los que podrían estar acostumbrado a dejar abiertos en HTML5, como < br >, < input >, < li > etc.

```js
// Hacer esto:
return <br /> ;
return <input type='password' /> ;
return <li> text </li> ;

// No esto:
return <br> ;
return <input type='password' > ;
return <li> text;
```