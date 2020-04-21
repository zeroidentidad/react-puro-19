# JSX:

Una de las primeras cosas que probablemente se notó sobre el código React del *hola mundo* es que parece que la función del componente está devolviendo HTML. Esta sintaxis similar a HTML en realidad se llama JSX.

### Qué es JSX

JSX es una sintaxis inventada para React que se parece mucho a (X)HTML. Permite crear elementos escribiendo una sintaxis de aspecto familiar, en lugar de escribir las llamadas de función a mano. La sintaxis similar a HTML en realidad se compila en JavaScript real.

La falta de citas tampoco es solo un truco. React no analiza las etiquetas y las convierte a HTML. Sin embargo, en realidad, JSX es solo una buena sintaxis para llamadas a funciones que crean elementos DOM.

### JSX es compilado ó transpilado a JavaScript

Los elementos JSX que se escriben son compilados en JavaScript mediante una herramienta llamada Babel. Babel es un compilador que transforma el código en JavaScript ES5 válido que todos los navegadores puedan entender, y está incluido en los proyectos creados con Create React App.

Después de ejecutar *npm start*, una herramienta llamada Webpack está buscando cambios en los archivos. Cuando lo hacen, alimenta esos archivos en Babel, que convierte JSX en JS, y lo envía al navegador a través del servidor de desarrollo que se ejecuta en el puerto 3000 por default.

Cada elemento JSX se convierte en una llamada de función, donde sus argumentos son sus atributos ("props") y su contenido ("children").

Aquí hay un ejemplo de un componente React simple que devuelve JSX:

```js
function Hello() {
return <span> Hello! </span> ;
}
```

Y aquí está el JavaScript generado por el compilador de Babel:

```js
function Hello() {
return React.createElement(
'span',
{},
'Hello!'
);
}
```

La firma de la función React.createElement se ve así:

```js
React.createElement(
string | element,
[propsObject],
[children...]
)
```

El *string*|*element* puede ser una cadena que describe una etiqueta HTML o SVG (como 'div' o 'span'), o puede ser una función componente (como HelloWorld, sin comillas).

El *propsObject* y *children* son opcionales, y también se puede proporcionar más de un hijo pasando argumentos adicionales:

```js
function HelloWorld() {
return React.createElement(
'div',
{},
'Hello',
'World'
);
}
```

También se puede anidar las llamadas:

```js
function ManyChildren() {
return React.createElement('div', {},
React.createElement('div', {}, 'Child1'),
React.createElement('div', {}, 'Child2',
React.createElement('div', {}, 'Child2_child')
)
);
}
```

Aquí hay algo un poco más complicado de JSX y una vista previa de que puede ser más complejo. Puede verse que hace referencia a un parámetro de función denominado props. Todavía no se habla de props, pero esta es la forma en que se pasa argumentos a los componentes React.

```js
function SongName(props) {
return (
<span className='song-name' >
{props.song.name}
</span>
);
}
```

Y esto es lo que compila:

```js
function SongName(props) {
return (
React.createElement('span',
{ className : 'song-name' },
props.song.name
)
);
}
```

¿Se ve cómo JSX es esencialmente una buena abreviatura para escribir llamadas a funciones? Ni siquiera se tiene que usar JSX si no se desea; puede escribirse estas llamadas de función manualmente.

Escribir las llamadas React.createElement no es un enfoque común en la comunidad React. Esencialmente, todos los desarrolladores de React usan JSX, lo que significa que es probable que se escriba el código que se ve asi naturalemente (en GitHub, Stack Overflow, etc.).