# Re-obtener datos (Re-Fetch) cuando cambian

Ampliando el ejemplo anterior, para cubrir otro problema común: cómo volver a buscar datos cuando algo cambia, como una ID de usuario o, en este caso, el nombre del subreddit.

Primero, cambiar el componente Reddit para aceptar el subreddit como prop, buscar los datos basados en ese subreddit y solo volver a ejecutar el efecto cuando cambie la prop:

```js
// 1. Desestructurar la prop `subreddit`:
function Reddit({ subreddit }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Obtener los datos cuando se monta el componente
        fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(res => res.json())
        .then(json =>
        // Guardar posts en el state
        setPosts(json.data.children.map(c => c.data))
        )
    }, [subreddit, setPosts]);

    return (
        <ul>
        {posts.map(post => (
            <li key={post.id} > {post.title} </li>
        ))}
        </ul>
    );
}

// 4. Pasar "reactjs" como prop:
ReactDOM.render(
    <Reddit subreddit='reactjs' /> ,
    document.querySelector("#root")
);
```

Esto todavía está hardcodeado, pero ahora se puede personalizar envolviendo el componente Reddit con uno que permita cambiar el subreddit. Agregar este nuevo componente en la aplicación y renderizar en la parte inferior:

```js
function App() {
    // 2 piezas de estado: una para mantener el valor de entrada,
    // otro para mantener el subreddit actual.
    const [inputValue, setValue] = useState("reactjs");
    const [subreddit, setSubreddit] = useState(inputValue);

    // Actualizar el subreddit cuando el usuario presione enter
    const handleSubmit = e => {
        e.preventDefault();
        setSubreddit(inputValue);
    };
    
    return (
        <>
        <form onSubmit={handleSubmit} >
        <input
        value={inputValue}
        onChange={e => setValue(e.target.value)}
        />
        </form>
        <Reddit subreddit={subreddit} />
        </>
    );
}

ReactDOM.render(<App /> , document.querySelector("#root"));        
```

La aplicación mantiene 2 partes de estado aquí: el valor de entrada actual y el subreddit actual. El envío de la entrada "confirmará" el subreddit, lo que hará que Reddit vuelva a buscar los datos de la nueva selección. Ajustar la entrada en un formulario permite al usuario presionar Enter para enviar.

Escribir con cuidado. No hay manejo de errores. Si se escribe un subreddit que no existe, la aplicación fallará.

Se podría haber usado solo 1 estado aquí para almacenar la entrada y enviar el mismo valor a Reddit, pero luego el componente Reddit estaría obteniendo datos con cada pulsación de tecla.

El useState en la parte superior puede parecer un poco extraño, especialmente la segunda línea:

```js
const [inputValue, setValue] = useState("reactjs");
const [subreddit, setSubreddit] = useState(inputValue);
```

Se esta pasando un valor inicial de "reactjs" a la primera parte del estado, y eso tiene sentido. Ese valor nunca cambiará.

Pero qué hay de esa segunda línea? Qué pasa si cambia el estado inicial? (cuando escriba en el cuadro de texto)

*useState* tiene el estado. Solo se usa el estado inicial una vez, la primera vez que se renderiza. Después de eso se ignora. Por lo tanto, es seguro pasar un valor transitorio, como una prop que podría cambiar o alguna otra variable.