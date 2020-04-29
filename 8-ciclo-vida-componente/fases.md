# Fases

Dentro del ciclo de vida de un componente, se producen algunas fases.

1. **Mount**: El montaje se produce cuando el componente se agrega por primera vez al DOM. La inicialización y la configuración se realizan aquí.

2. **Render**: La representación se produce cuando el componente se procesa por primera vez, y cada vez que se vuelve a procesar debido a un cambio en las props o el estado. A pesar de su nombre, la fase de representación no cambia lo que se ve en la página.

3. **Commit**: La confirmación toma la salida del render y actualiza el DOM para que coincida.

4. **Unmount**: El desmontaje ocurre cuando el componente se elimina del DOM.

Abajo un ejemplo que utiliza todos los métodos del ciclo de vida. Ejecutar, abrir la consola del navegador, hacer clic en el botón y mirar la consola para ver el orden en que fueron llamados. Hay dos componentes, ErrorCatcher y LifecycleDemo, porque los límites de error (componentes que implementan componentDidCatch) solo pueden detectar errores en sus hijos, no en ellos mismos.

```js
import React from 'react';
import ReactDOM from 'react-dom';

class ErrorCatcher extends React.Component {
    state={ error: null }

    componentDidCatch(error, info) {
        console.log('[componentDidCatch]', error);
        this.setState({ error: info.componentStack });
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    An error occurred: { this.state.error}
                </div>
            )
        }

        return this.props.children;
    }
}

class LifecycleDemo extends React.Component {
    // Inicializar el estado primero
    // (sucede antes del constructor)
    state={ counter: 0 };

    // El primer método llamado después de inicializar el estado
    constructor(props) {
        super(props);
        console.log('[constructor]');
        console.log('State already set: ', this.state);
    }
    
    // Se llama después de que se realiza el renderizado inicial.
    // Este es un buen lugar para comenzar solicitudes
    // de red para obtener datos.
    componentDidMount() {
        console.log('[componentDidMount]', 'Mounted.');
    }

    // ** No olvidar hacerlo `static` **
    // Llamado antes del render inicial, y en cualquier momento nuevas props
    // son recibidas. - No se usa comúnmente.
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[getDerivedStateFromProps]');
        console.log(' Next props:', nextProps);
        console.log(' Prev state:', prevState);
        return null;
    }

    // Llamado antes de cada render. Devuelve falso para evitar el renderizado.
    // Esto (y PureComponent) son las principales formas de optimizar
    // componentes de clase. Si se nota que el rendimiento es lento,
    // medir con el generador de perfiles (profiler), luego intentar implementar el método
    // para evitar renders innecesarios. React es rápido en uso fuera de caja,
    // y algunos renders adicionales no harán daño. No se recomendaria
    // implementar este método a menos que se sepa que es necesario.
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[shouldComponentUpdate]', 'Deciding to update');
        return true;
    }

    // Llamado después de render() pero antes de actualizar el DOM
    // Un buen momento para hacer cálculos basados en nodos DOM antiguos.
    // El valor devuelto aquí se pasa a componentDidUpdate
    getSnapshotBeforeUpdate(nextProps, nextState) {
        console.log('[getSnapshotBeforeUpdate]', 'About to update...');
        return `Time is ${Date.now()}`;
    }

    // Llamado después de render() y después de actualizar el DOM. El conjunto
    // del ciclo render/commit/update fue hecho.
    // Este es un buen momento para verificar si una prop ha cambiado,
    // verificando prevProps.whatever === this.props.whatever.
    // Útil para recuperar datos cuando cambia un ID de registro.
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[componentDidUpdate]', 'Updated.');
        console.log('snapshot: ', snapshot);
    }

    // Llamado justo antes de desmontar el componente
    // Momento para limpiar. Eliminar cualquier listeners de eventos, cancelar
    // temporizadores, etc.
    componentWillUnmount() {
        console.log('[componentWillUnmount]', 'Goodbye cruel world.');
    }

    handleClick=() => {
        this.setState({
            counter: this.state.counter+1
        });
    };

    causeErrorNextRender=() => {
        // Establecer flag para causar un error en el próximo render
        // Esto hará que componentDidCatch se ejecute en el padre
        this.setState({
            causeError: true
        });
    };

    render() {
        console.log('[render]');
        if (this.state.causeError) {
            throw new Error('oh no!!');
        }

        return (
            <div>
                <span> Counter: {this.state.counter} </span>
                <button onClick={this.handleClick} >
                    Click to increment
                </button>
                <button onClick={this.causeErrorNextRender} >
                    Throw an error
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <ErrorCatcher>
        <LifecycleDemo />
    </ErrorCatcher>,
    document.querySelector('#root')
);
```