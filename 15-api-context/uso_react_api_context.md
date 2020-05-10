# Usando React API Context

Context es como un bus eléctrico que se ejecuta detrás de cada componente: para recibir la energía (datos) que lo atraviesan, solo se necesita enchufarlo. 

*Dato curioso: si se ha utilizado Redux y se pregunta cómo se pasan los datos detrás de escena, Context es el ingrediente secreto*

Hay 3 piezas importantes para la API Context:

• La función **React.createContext** crea el contexto.
• El **Provider** (devuelto por *createContext*) establece el "bus eléctrico" que se ejecuta a través de un subárbol de componentes.
• El **Consumer** (también devuelto por *createContext*) aprovecha el "bus eléctrico" para extraer los datos.

El *Provider* acepta una prop *value* que puede ser lo que sea. Lo más probable es que sea un objeto que contenga datos y cualquier acción que se desee realizar en los datos.

El *Consumer* aprovecha los datos y los pone a disposición del componente que los necesite.

Ahora el mismo ejemplo anterior, reescrito para usar Context para pasar los datos.

```js
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// Primero, crear un nuevo contexto.
// createContext devuelve un objeto con 2 propiedades:
// { Provider, Consumer }

const UserContext = React.createContext();

// Los componentes que necesitan los datos pueden aprovechar el contexto
// renderizando al Consumer. Se utiliza el patrón "render props"
// -- renderizando de una función como hijo
const UserAvatar = ({ size }) => (
    <UserContext.Consumer>
    {user => (
        <img
        className={`user-avatar ${size || ""}`}
        alt="user avatar"
        src={user.avatar}
        />
    )}
    </UserContext.Consumer>
);

// Ya no se necesita la prop 'user'
// El Consumer recupera user del contexto
const UserStats = () => (
    <UserContext.Consumer>
    {user => (
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
    )}
    </UserContext.Consumer>
);

// Los componentes que una vez tuvieron que lanzar la prop `user`
// ahora son más agradables y simples.
const Nav = () => (
    <div className="nav" >
        <UserAvatar size="small" />
    </div>
);

const Content = () => (
    <div className="content" >
        main content here
    </div>
);

const Sidebar = () => (
    <div className="sidebar" >
        <UserStats />
    </div>
);

const Body = () => (
    <div className="body" >
        <Sidebar />
        <Content />
    </div>
);

// Dentro de App, se pone a disposición el contexto
// usando el Provider
class App extends React.Component {
    state = {
        user: {
            avatar: "https://www.gravatar.com/avatar/763dcd4dad38689d57aa9d83a60bfaa5",
            name: "Zero",
            followers: 1234,
            following: 123
        }
    };
    
    render() {
        return (
            <div className="app" >
                <UserContext.Provider value={this.state.user} >
                    <Nav />
                    <Body />
                </UserContext.Provider>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
```

## Provider y Consumer son pareja

El Provider y el Consumer están unidos. Inseperables. Y solo saben comunicarse entre ellos. Si se creó 2 contextos separados, digase "Context1" y "Context2", entonces el Provider y el Consumer de Context1 no podrán comunicarse con el Provider y Consumer de Context2.

## Context no mantiene estado

Un hecho importante de Context es que no posee ninguno de sus propios estados. Es simplemente un conducto para sus datos. Pensar en esto como pasar props (pues asi es). No colocar tantos datos en Context como lo datos pasando a través del Context.

Cuando se pasa la prop de *value* al Provider, ese valor exacto se transmite a cualquier Consumer que sepa cómo buscarlo (solo los Consumer que están vinculados al mismo contexto que el Provider), y el Provider no "guarda" ese valor en algun lugar. Para cambiar el valor, simplemente pasar algo nuevo en la prop *value*.

## Valor predeterminado

Cuando se crea el contexto, se puede pasar un "valor predeterminado" como esto:

```js
const Ctx = React.createContext(myDefaultValue);
```

Este valor predeterminado es lo que recibirá el Consumer cuando se coloque en un árbol sin un Proveedor sobre el. Si no se pasa uno, el valor predeterminado será *undefined*.

Este es un valor predeterminado, no un valor inicial. La diferencia es sutil pero importante. Un contexto no retiene nada; simplemente distribuye los datos que pasa como la prop value en el Provider.