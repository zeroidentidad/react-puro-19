# Recibir Props

Las props se pasan como un objeto y son el primer argumento para una función componente, como este:

```js
function Hello(props) {
    return (
        <span> Hello, {props.name} </span>
    );
}

// Utilizado como:
<Hello name="Perro" />
```

Funciona de la misma manera para las funciones de flecha:

```js
const Hello = (props) => (
    <span> Hello, {props.name} </span>
);
```

ES6 tiene la sintaxis llamada desestructuración (destructuring) que facilita el trabajo con las props. Se parece a esto:

```js
const Hello = ({ name }) => (
    <span> Hello, {name} </span>
);
```

Se puede leer {name} como "extraer la clave 'name' del objeto pasado como primer argumento y colocarla en una variable llamada name". También se puede extraer varias claves al mismo tiempo:

```js
const Hello = ({ firstName, lastName }) => (
    <span> Hello, {firstName} {lastName} </span>
);

// otra forma valida seria si la convencion de
// nombres de props difiere de solo letras ('first_Name')

const Hello=({ first_Name, last_Name }) => (
    <span> Hello, {first_Name} {last_Name} </span>
);

// caso especial 'first-Name', no funciona a lo anterior
// solo asi

const Hello= props => (
    <span> Hello, {props['first-Name']} {props['last-Name']} </span>
);
```

En la práctica, las props se escriben con mucha frecuencia utilizando esta sintaxis de desestructuración. Que también funciona fuera de los argumentos de la función. Puede desestructurarse las props de esta manera, por ejemplo:

```js
const Hello = (props) => {
    const { name } = props;
    
    return (
        <span> Hello, {name} </span>
    );
}
```

Las funciones de flecha necesitan un retorno si el cuerpo está rodeado de llaves, y necesita llaves si el cuerpo contiene varias líneas.

## Modificación de props

Una cosa importante a saber es que las props son de solo lectura. Los componentes que reciben props no deben cambiarlas.

Si proviene de un marco que tiene enlace bidireccional (como AngularJS, Vue), esto es un cambio.

En React, los datos fluyen en una dirección. Las props son de solo lectura y solo se pueden transmitir a los hijos.