# Qué colocar en el State

¿Cómo se decide qué debería ir en el estado? ¿Hay algún otro lugar para almacenar datos persistentes?

Como regla general, los datos que se almacenan en el estado deben referenciarse dentro del render en alguna parte. El state del componente es para almacenar el estado de la interfaz de usuario, cosas que afectan la representación visual de la página. Esto tiene sentido porque cada vez que se actualiza el estado, el componente se volverá a representar.

Si modificar una pieza de datos no cambia visualmente el componente, esos datos no deberían ir en el estado. Ejemplos de algunas cosas que tienen sentido colocar en state:

• Entrada ingresada por el usuario (valores de cuadros de texto y otros campos de formulario)

• Elemento actual o seleccionado (la pestaña actual, la fila seleccionada)

• Datos del servidor (una lista de productos, el número de "me gusta / favoritos" en una página)

• Estado abierto / cerrado (modal abierta / cerrada, barra lateral expandida / oculta)

Otros datos con estado que no afectan la salida visual, como los identificadores de temporizadores y controladores de eventos, deben almacenarse en la propia instancia del componente. Se tienes al objeto **this** disponible en los componentes de Clase. Se pueden almacenar valores en él.

## Deben las Props ir en el State?

Se debe evitar copiar props en el estado. Crea una segunda fuente verdadera para los datos, que generalmente ocasiona errores.

Los componentes se volverán a renderizar automáticamente cuando lo hagan sus padres, y recibirán props nuevas cada vez, por lo que no es necesario duplicar las props en el estado y luego intentar mantenerlas actualizadas.

En el código orientado a objetos, es común instanciar un objeto con un conjunto de valores y hacer que el objeto exista independientemente a partir de ese momento. En esos casos, es posible que se deba "mantener el objeto sincronizado" actualizando manualmente sus valores internos para que coincidan con el entorno.

Sin embargo, React es más funcional por naturaleza. Un componente recibirá props nuevas de su padre cada vez que se vuelva a renderizar (y esto se aplica tanto a clases como a componentes de función). No hay que preocuparse de que un componente se desincronice después del primer renderizado, de hecho, si se intenta copiar props en el state para evitar un problema de sincronización, podría causarse un error.

Mal ejemplo:

```js
// No hacer esto:
class BadExample extends Component {
    state = {
        data : this.props.data
    }

    // La función componentDidUpdate se ejecutará *después*
    // de que se produce un render
    componentDidUpdate(oldProps) {
    
        /*
        Al duplicar los datos, debe mantenerse la copia local 
        sincronizada con las props actualizadas.
        */
        if (oldProps.data !== this.props.data) {
            // El componente ya renderizado una vez con el
            // nuevo valor de this.props.data, y copiando ese
            // valor en el state hará que vuelva a aparecer *nuevamente*.
            this.setState({ data: this.props.data });
        }
    }

    render() {
        return (
            <div> Data: {this.state.data} </div>
        )
        }
    }

// Mejor hacer esto:
class GoodExample extends Component {
    render() {
        return (
            <div> Data: {this.props.data} </div>
        )
    }
}    
```

## Inicializando State desde Props

Entonces, ¿alguna vez está bien inicializar el estado basado en props? Si... La versión original de la documentación de React menciona esto:

    Sin embargo, no es un antipatrón si se deja en claro que la prop es solo información inicial para el state controlado internamente del componente.

Pensarlo de esta manera: está bien si el estado necesita un valor inicial que el componente controlará. Preguntarse: ¿este componente "posee" los datos? ¿Necesita un "valor predeterminado" para una parte del estado? Esas son buenas razones para inicializar el state desde prop.