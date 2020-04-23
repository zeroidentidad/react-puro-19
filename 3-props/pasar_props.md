# Pasar Props

Aquí hay un poco de JSX que pasa una prop llamada name con un valor de cadena de "Zero" en el componente Person:

```js
<Person name='Dave' />
```

Otro ejemplo, pasando una clase className con el valor "person":

```js
<div className='person' />
```

JSX usa *className* en lugar de class para especificar clases CSS. Puede olvidarse esto una y otra vez. Se escribirá "class" por costumbre, y React advertirá al respecto. Esta bien, simplemente cambiarlo a className.

Si se observa el div se cierra automáticamente. Esta capacidad ya no es solo para < input />: en JSX, cada componente puede cerrarse automáticamente. De hecho, si el componente no tiene hijos (sin contenido), la convención es escribirlo así, en lugar de usar una etiqueta de cierre como < div > </ div >.

En el siguiente componente, se pasa una cadena para className, un número para el prop de age y una expresión de JavaScript normal como name:

```js
function Dave() {
    const firstName = "Zero";
    const lastName = "Identidad";
    
    return (
        <Person
        className='person'
        age={33}
        name={firstName + ' ' + lastName} />
    );
}
```

Es importante comprender que el JS dentro de las llaves debe ser una expresión, no una declaración. Aquí algunas cosas que se puede hacer dentro de las expresiones JSX:

```txt
• Matemáticas, concatenación: {7 + 5} o {'Tu' + 'Nombre'}
• Llamadas de función: {this.getFullName (person)}
• Operador ternario (?): {name === 'Zero'? 'yo': 'no yo'}
• Expresiones booleanas: {isEnabled && 'enabled'}
```

Aquí hay algunas cosas que no puedes hacer:

```txt
• Definir nuevas variables con let, const y var.
• Usar if, for, while, etc.
• Definir funciones con function
```

Todas las reglas que se aplican a los argumentos de función se aplican a las expresiones JSX. ¿Se podría llamar a una función como esta?

```js
myFunc( const x = true ; x && 'is true');
```

Pues no! Eso se ve mal. Si se intenta pasar ese argumento a una expresión JSX, esto es lo que se obtendrá:

```js
<Broken value={ const x = true ; x && 'is true'} />
// gets compiled to:
React.createElement(Broken, {
    value : const x = true ; x && 'is true'
    }, null );
```

Entonces, cuando se intente decidir qué colocar en una expresión JSX, preguntarse: "¿Podría pasar esto como un argumento de función?"