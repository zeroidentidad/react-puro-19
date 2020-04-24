# Documentación y depuración incluida

Se visto qué son los "props" y cómo se pasan a los componentes React, pero ¿qué sucede si se olvida pasar una de las props?

Pues, termina siendo undefined, como si se hubieras olvidado de pasar un argumento a una función vieja. Esto puede estar bien o puede ser un desastre para romper el código (como si se hubiera olvidado pasar un argumento a una función antigua).

Si se desea evitar esto, hay dos opciones comues: escribir la aplicación en TypeScript, o seguir con JS y ser diligente con el uso de PropTypes.

## Cómo escribir PropTypes

Cuando se crea un componente, puede declarar que ciertas props son opcionales o requeridas, y se puede declarar qué tipo de valor espera esa prop. Aquí un ejemplo:

```js
import PropTypes from 'prop-types';

function Comment({ author, message, likes }) {
    return (
        <div>
        <div className='author' > {author} </div>
        <div className='message' > {message} </div>
        <div className='likes' >
        {likes > 0 ? likes : 'No'} likes
        </div>
        </div>
    );
}

Comment.propTypes = {
    message : PropTypes.string.isRequired,
    author : PropTypes.string.isRequired,
    likes : PropTypes.number
}
```

Observar que PropTypes debe importarse explícitamente desde el paquete "prop-types".

Antes de React 15.5, prop-types se incluían junto con el paquete de react, pero hoy normalmente se necesitará instalar este paquete por separado, asi:

```shell
$ npm install prop-types
```

Luego, observar que propTypes se configuran como una propiedad en el componente mismo. Este patrón es el mismo si el componente es una función regular, una función de flecha o incluso una clase ES6.

Finalmente, observar que el atributo propTypes comienza con una "p" minúscula mientras que los PropTypes importados
comienza con una "P" mayúscula.

Con este conjunto de propTypes, se requieren message y author, y deben ser strings. La prop likes es opcional, pero debe ser un número si se proporciona. Al intentar renderizar de diferentes maneras y comprobar la consola del navegador cada vez:

```js
<Comment author='somebody' message='a likable message' likes={1} />
<Comment author='mr_unpopular' message='unlikable message' />
<Comment author='mr_unpopular' message='another message' likes={0} />
<Comment author='error_missing_message' />
<Comment message='mystery author' />
```

React avisará en la consola del navegador si se olvida alguna prop requerida:

```js
<Comment author='an_error' />
```

    - Warning: Failed prop type: The prop message is marked as required in Comment , but its value is undefined .

Del mismo modo, se recibirá advertencia si se pasa el tipo incorrecto:

```js
<Comment author={42} />
```

    - Warning: Failed prop type: Invalid prop author of type number supplied to Comment , expected string.

Estos mensajes de advertencia son invaluables para depuración.Te dice el error que cometiste y te da una pista de dónde. Esto es mejor que otros frameworks que fallan silenciosamente cuando se olvida un atributo requerido.

## Catch

Entonces, ¿cuál es el Catch? Todo este buen manejo de errores debe tener Catch, ¿verdad?

Pues... El único inconveniente con prop types es que se debe recordar declararlos. Proporcionar propTypes es 
opcional, y React no le dará ninguna advertencia si no se especifica propTypes en alguno de los componentes.

Entonces se puede procurar ser súper diligente al escribir propTypes, o se puede hacer que una herramienta de comprobación (linter) lo haga por uno mismo.

Para esto ESLint es una opción popular, y hay un complemento React para ESLint que verificará cosas como PropTypes faltantes y que las props se pasen correctamente.

