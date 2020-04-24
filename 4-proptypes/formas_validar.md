# Cómo validar, formas comunes

PropTypes viene con muchos validadores incorporados. Primero, hay validadores para los tipos de JavaScript estándar:

• PropTypes.array

• PropTypes.bool

• PropTypes.func

• PropTypes.number

• PropTypes.object

• PropTypes.string

Viendo los validadores de string y number en el componente Comment de tema anterior. Los otros funcionan de la misma manera: validando que se pasa una arreglo, un booleano, una función, o lo que sea.

Hay validadores para node y element. Un node es cualquier cosa que se pueda representar, es decir, números, cadenas, elementos o una matriz de ellos. Un element es un elemento React creado con JSX o llamando a React.createElement:

• PropTypes.node

• PropTypes.element

Existe validación *instanceOf* para verificar que la prop sea una instancia de una clase específica. Se necesita un argumento:

• PropTypes.instanceOf(SpecificClass)

Se puede limitar a valores específicos con oneOf:

• PropTypes.oneOf(['person', 'place', 1234])

Se puede validar que la prop es una de un conjunto de tipos:

```js
PropTypes.oneOfType([
PropTypes.string,
PropTypes.boolean
])
```

Se puede validar que se trata de un arreglo de cierto tipo, o un objeto cuyas propiedades son valores de cierto tipo:

• PropTypes.arrayOf(PropTypes.string)

    – Coincidiría: ['a', 'b', 'c']
    – No coincidiría: ['a', 'b', 42]

• PropTypes.objectOf(PropTypes.number)

    – Coincidiría: {age: 27, birthMonth: 9}
    – No coincidiría: {age: 27, name: 'Joe'}

Se puede validar que un objeto tiene una determinada forma, lo que significa que tiene propiedades particulares. El objeto pasado a esta prop también puede tener propiedades adicionales, pero al menos debe tener las que están en la descripción de la forma.

```js
PropTypes.shape({
name : PropTypes.string,
age : PropTypes.number
})
```

Esto coincidirá con un objeto de la forma exacta:

```js
person = {
    name : 'Joe',
    age : 27
}
```

También coincidirá con un objeto con propiedades adicionales, como este:

```js
person = {
    name : 'Joe',
    age : 27,
    address : '123 Fake St',
    validPerson : false
}
```

Dado que esta forma de PropTypes requiere un objeto que tenga claves de nombre y edad, si se deja una de ellas desactivada, no pasará. Esto generaría una advertencia:

```js
person = {
    age : 27
}
```

Del mismo modo, si se pasa el tipo incorrecto en una de esas claves, se recibira una advertencia:

```js
person = {
    name : false , // boolean instead of string
    age : 27
}
```

## Props requeridas

Por defecto, una validación propType es opcional. Las props opcionales no avisarán si faltan, pero sí, si se pasa el tipo incorrecto.

Cualquier validación de PropType se puede requerir agregando *.isRequired* al final de la misma. Algunos ejemplos:

```js
PropTypes.bool.isRequired

PropTypes.oneOf(['person', 'place', 1234]).isRequired

PropTypes.shape({
    name : PropTypes.string,
    age : PropTypes.number
}).isRequired
```

## Validadores personalizados

Si los validadores de PropType incorporados no son lo suficientemente expresivos, se puede escribir los propios. La función debe tomar los props, propName y componentName, y devolver un error si falla la validación. Tener en cuenta que retorna un error, no arroja un error.

Un validador personalizado para verificar que la prop pasada tiene exactamente la longitud 3 (ya sea una cadena o un arreglo) se vería así:

```js
function customValidator(props, propName, componentName) {
    // propName === "myCustomProp"
    if (props[propName].length !== 3) {
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Length is not 3.'
        );
    }
}

const CustomTest = ({ myCustomProp }) => (
    <span> {myCustomProp} </span>
);
CustomTest.propTypes = {
    myCustomProp : customValidator
}

// Esto producirá una advertencia:
ReactDOM.render(
    <CustomTest myCustomProp='not_three_letters' /> ,
    document.querySelector('#root')
);

// Esto pasará:
ReactDOM.render(
    <CustomTest myCustomProp={[1, 2, 3]} /> ,
    document.querySelector('#root')
);

// Esto tambien pasará:
ReactDOM.render(
    <CustomTest myCustomProp="abc" /> ,
    document.querySelector('#root')
);    
```