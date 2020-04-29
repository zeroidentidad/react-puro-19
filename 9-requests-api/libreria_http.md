# Eligir libreria HTTP

Para obtener datos del servidor, se necesitará una libreria HTTP. Hay varias por ahí en la comunidad. En definitiva, todas hacen lo mismo, pero tienen características diferentes.

## Axios

La favorita de muchos es [axios](https://github.com/axios/axios). Utiliza Promises, analiza/convierte automáticamente JSON por uno mismo y trata los códigos de respuesta que no son 200 como errores. También da como resultado un código menos detallado para operaciones que no son GET como POST/PUT/PATCH/etc. Un inconveniente es que es una libreria adicional para instalar que no viene integrada.

Ejemplo de código usando axios para obtener algunos datos de reddit:

```js
import axios from 'axios';

axios.get(`http://www.reddit.com/r/reactjs.json`)
.then(response => {
    const posts = response.data.data.children.map(
        obj => obj.data
    );
    console.log(posts);
})
.catch(error => {
    console.error(error);
});
```

Observar que no hay código específico de React. Este mismo código podría obtener datos en cualquier aplicación sobre JS. Una vez que se reciban los datos, pueden colocarse en el state y renderizarlos desde allí. Asi se confirma que React no sabe nada sobre la obtención de datos.

## Fetch

Otra buena opción es la función **fetch()** integrada en los navegadores modernos. La API Fetch es parte del estándar de JavaScript. Se requiere un paso adicional para analizar/convertir las respuestas JSON, y trata básicamente cada respuesta como exitosa, incluidas las 404 y 500, por lo que el manejo de errores implica un poco más de código. También es más detallada si se necesita hacer una operación POST/PUT/DELETE u otra operación que no sea GET.

La misma llamada a Reddit, pero esta vez usando fetch:

```js
// no se necesita importar nada

fetch(`http://www.reddit.com/r/reactjs.json`)
.then(response => {
    if (response.ok){
        return response.json();
    }
    throw new Error('Request failed');
})
.then(json => {
    const posts = res.data.data.children.map(
        obj => obj.data
    );
    console.log(posts);
})
.catch(error => {
    console.error(error);
});
```

Algunos navegadores no tienen la función de **fetch** disponible. Para aquellos, la aplicación Create React agrupa el [polyfill](https://developer.mozilla.org/es/docs/Glossary/Polyfill) de fetch, por lo que se puede estar seguro de que **fetch** estará disponible cuando se ejecute el código.