# Patrón "Slots"

Si se puede encontrar una manera de fusionar la estructura de la aplicación y aprovechar la prop de hijos (*children*), puede conducirse a un código más limpio sin tener que recurrir a la perforación profunda, Context o cualquier otra cosa.

La prop children es una buena solución para componentes que necesitan ser marcadores de posición genéricos, como Nav, Sidebar y Body en el ejemplo anterior. También se pueden pasar elementos JSX a cualquier props, no solo a "children", por lo que si se necesita más de un "slot" para conectar componentes, tenerlo en cuenta.

Aquí el mismo ejemplo basado en el anterior, reescrito para que Nav y Sidebar acepten prop children y lo representen como están. También el componente Body no toma la prop "children", pero tiene dos "slots" que muestra en la página. Escrito de esta manera, el componente App de nivel superior simplemente puede representar lo que necesita, utilizando los datos que ya tiene dentro del alcance, sin tener que pasar datos a más de un nivel.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const UserAvatar = ({ user, size }) => (
    <img
    className={`user-avatar ${size || ''}`}
    alt="user avatar"
    src={user.avatar}
    />
);

const UserStats = ({ user }) => (
    <div className="user-stats" >
        <div>
            <UserAvatar user={user} />
            {user.name}
        </div>
        <div className="stats" >
            <div> {user.followers} Followers </div>
            <div> Following {user.following} </div>
        </div>
    </div>
);

// Aceptar children y renderizarlos
const Nav = ({ children }) => (
    <div className="nav" > {children} </div>
);

const Content = () => (
    <div className="content" > main content here </div>
);

// Aceptar children y renderizarlos
const Sidebar = ({ children }) => (
    <div className="sidebar" > {children} </div>
);

// Body necesita una barra lateral y contenido, pero 
// escrito de esta manera, pueden ser CUALQUIER COSA
const Body = ({ sidebar, content }) => (
    <div className="body" >
        <Sidebar> {sidebar} </Sidebar>
        {content}
    </div>
);

class App extends React.Component {
    state = {
        user: {
            avatar: 'https://www.gravatar.com/avatar/763dcd4dad38689d57aa9d83a60bfaa5',
            name: 'Zero',
            followers: 1234,
            following: 123
        }
    };
    
    render() {
        const { user } = this.state;

        return (
            <div className="app" >
                <Nav>
                    <UserAvatar user={user} size="small" />
                </Nav>
                <Body
                    sidebar={ <UserStats user={user} /> }
                    content={ <Content /> }
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
```

Sin embargo, si la aplicación es más compleja, podría ser difícil descubrir cómo adaptar el patrón de los children y slots de esta manera.

En sección siguiente se verá cómo se puede reemplazar la perforación de props y el patrón de esta sección con la API Context.