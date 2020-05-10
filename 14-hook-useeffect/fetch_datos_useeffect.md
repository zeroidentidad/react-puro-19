# Obtener datos (Fetch) con useEffect

Vease otro caso de uso común: obtener datos y mostrarlos. En un componente de clase, pondría este código en el método *componentDidMount*. Para hacerlo con hooks, se recurre a useEffect. También se necesita useState para almacenar los datos a mostrar.

Vale la pena mencionar que cuando la parte de recuperación de datos de la función *Suspense* de React esté finalizada y se popularise, será la forma preferida de recuperar datos. Obtener de useEffect tiene un problema considerable y la API de Suspense es más fácil de usar. Por ahora, de forma común, useEffect hace el trabajo.

Ejemplo de componente que busca publicaciones de Reddit y las muestra:

```js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Reddit() {
    // Inicializar estado para guardar posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch data cuando se monta el componente
        fetch("https://www.reddit.com/r/reactjs.json")
        .then(res => res.json())
        .then(json =>
        // Guarda posts en estado
        setPosts(json.data.children.map(c => c.data))
        )
    }); // <-- No se paso el segundo argumento ([]). que sucederá?
    
    // Renderizar como siempre
    return (
        <ul>
        {posts.map(post => (
            <li key={post.id} > {post.title} </li>
        ))}
        </ul>
    );
}

ReactDOM.render(
    <Reddit /> ,
    document.querySelector("#root")
);
```

Se notará que no se esta pasando el segundo argumento para usar Effect aquí. Esto es malo.

No pasar ningún segundo argumento hace que useEffect se ejecute en cada render. Luego, cuando se ejecuta, recupera los datos y luego actualiza el estado. Una vez que se actualiza el estado, el componente se vuelve a representar, lo que activa nuevamente el uso del efecto. Puede verse el problema: se terminará en un bucle infinito!

Para solucionar esto, se necesita pasar un array como el segundo argumento. Qué debería ir en el array?

La única variable de la que depende useEffect es *setPosts*. Por lo tanto, debería pasarse en el array [setPosts]. Como setPosts es un setter devuelto por useState, no se volverá a crear en cada renderizado, por lo que el efecto solo se ejecutará una vez.

Dato curioso: cuando se llama a *useState*, la función de setter que devuelve solo se crea una vez. Será exactamente la misma instancia de función cada vez que se renderise el componente, por lo que es seguro que un efecto dependa de uno. Este hecho también es cierto para la función de dispatch devuelta por *useReducer*.