# Otros Patrones de Context

Dado que la creación de un contexto da 2 componentes para trabajar (Provider y Consumer), se es libres de usarlos como se quiera. Aquí hay un par de ideas.

## Convertir a Consumer en componente de orden superior (Higher-Order Component)

Agradaria la idea de agregar UserContext.Consumer en cada lugar que se necesite? Puede hacerse lo que se quiera.

Si se prefiere recibir el valor como prop, se podría escribir una pequeña envoltura alrededor del Consumer de esta manera:

```js
function withUser(Component) {
    return function ConnectedComponent(props) {
        return (
            <UserContext.Consumer>
            {user => <Component {...props} user={user} />}
            </UserContext.Consumer>
        );
    }
}
```

Y luego se podría reescribir, por ejemplo, UserAvatar para usar esta nueva función withUser:

```js
const UserAvatar = withUser(({ size, user }) => (
    <img
    className={`user-avatar ${size || ""}`}
    alt="user avatar"
    src={user.avatar}
    />
));
```

La función *withUser* sigue el patrón de "componente de orden superior" (también conocido *HoC*): toma un componente como argumento y lo envuelve devolviendo un nuevo componente (la función *ConnectedComponent*). Ese nuevo componente puede hacer lo que quiera: inyectar nuevas props, cambiar el valor de las props antes de pasarlos, o lo que sea. Principalmente, debe representar el Component que se pasó al HoC (withUser), pero más allá de eso, puede hacer lo que se quiera.

## Mantener estado en el Provider

El Provider del contexto es solo un conducto. No retiene ningún dato. Pero eso no impide crear un propio contenedor para guardar los datos.

En el ejemplo para iniciar con Context, se dejo App con los datos, de modo que lo único nuevo que se necesitaría comprender eran los componentes **Provider + Consumer**. Pero tal vez se quiera hacer un propio "store". Puede crearse un componente para mantener el estado y pasarlo a través del contexto:

```js
class UserStore extends React.Component {
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
            <UserContext.Provider value={this.state.user} >
            {this.props.children}
            </UserContext.Provider>
        );
    }
}

// ...
// ... los otros componentes no han cambiado ...
// ...

const App = () => (
    <div className="app" >
        <Nav />
        <Body />
    </div>
);

ReactDOM.render(
    <UserStore>
        <App />
    </UserStore> ,
    document.querySelector("#root")
);
```

Ahora los datos de user están bien contenidos en su propio componente cuya única preocupación son los datos de user. *App* puede ser sin estado una vez más. Y quiza se vea un poco más limpio.