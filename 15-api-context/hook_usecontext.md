# El Hook useContext

Un inconveniente de la API Context es cómo el Consumer agrega una gran cantidad de anidamiento con su patrón de render props. Es especialmente notable si un componente necesita extraer datos de algunos contextos diferentes:

```js
const Something = () => (
    <UserContext.Consumer>
    {user => (
        <LanguageContext.Consumer>
        {lang => (
            <ThemeContext.Consumer>
            {theme => (
                <div> zero </div>
            )}
            </ThemeContext.Consumer>
        )}
        </LanguageContext.Consumer>
    )}
    </UserContext.Consumer>
);            
```

Con la introducción de React Hooks, se puede simplificar mucho utilizando el hook *useContext* para acceder a los datos. Aquí está el mismo componente:

```js
const Something = () => {
    const user = useContext(UserContext);
    const lang = useContext(LanguageContext);
    const theme = useContext(ThemeContext);

    return <div> ey! </div> ;
};
```

Lo único a tener en cuenta es que *useContext* requiere que se le pase todo el objeto de contexto, no solo el Consumer del contexto. Aparte de eso, no hay nada más. El hook *useContext* se puede usar en cualquier lugar donde normalmente se usa el Consumer.

# Pasar acciones hacia abajo a través del contexto

El objeto que se pasa a través del Provider puede contener lo que se desee. Lo que significa que puede contener funciones. Incluso podría llamarsele "acciones".

Como ejemplo: una habitación simple con un interruptor de luz para alternar el color de fondo. El estado se mantiene en el store, que también tiene una función para alternar la luz. Tanto el estado como la función se transmiten a través del contexto. Esta vez usando hooks, solo para mostrar que Context funciona con hooks y clases.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Contexto vacío
const RoomContext = React.createContext();

// Un componente cuyo único trabajo es 
// administrar el estado de Room
function RoomStore({ children }) {
    const [isLit, setLit] = useState( false );

    const toggleLight = () => {
        setLit(!isLit);
    };
    
    // Pasar el estado y la acción onToggleLight
    return (
        <RoomContext.Provider
        value={{
            isLit,
            onToggleLight: toggleLight
        }}
        >
        {children}
        </RoomContext.Provider>
    );
}

// Recibir el estado de light y la función
// para alternar light, desde RoomContext
const Room = () => {
    const { isLit, onToggleLight } = useContext(RoomContext);
    
    return (
        <div className={`room ${ isLit ? 'lit' : 'dark'}`} >
            El cuarto es {isLit ? 'lit' : 'dark'}
            <br />
            <button onClick={onToggleLight} >
            Cambiar
            </button>
        </div>
    );
};

const App = () => (
    <div className="app" >
        <Room />
    </div>
);

// Envolver toda la aplicación en RoomStore
// (también podría hacerse esto adentro de App)
ReactDOM.render(
    <RoomStore>
        <App />
    </RoomStore> ,
    document.querySelector('#root')
);
```

Probar reescribiendo el código y al hacer clic ver cómo se encienden y apagan las luces.