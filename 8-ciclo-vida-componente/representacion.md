# Representación

Estos se llaman, en orden, antes y después de cada render. Solo se llama a **getDerivedStateFromProps** durante el renderizado inicial.

**componentWillReceiveProps(nextProps)** [deprecated]: Este método está en desuso a partir de React 16.3, aunque probablemente se encontrará código que lo usa. Utilizar *getDerivedStateFromProps* en su lugar.

**static getDerivedStateFromProps(nextProps, prevState)**: Da oportunidad para cambiar el state en función del valor de las props, que puede ser útil para la inicialización. No se usa con mucha frecuencia. No llamar a setState aquí, sino que se devuelva un objeto que represente el nuevo estado. Este método no debe tener efectos secundarios. Además, no olvidar la palabra clave **static** antes de este método o no funcionará. Como este método es estático, no se puede acceder a este objeto.

**shouldComponentUpdate(nextProps, nextState)**: Da oportunidad para evitar la representación si se sabe que las props y el state no han cambiado. La implementación predeterminada siempre devuelve verdadero. Si devuelve falso, el renderizado no ocurrirá (y los hijos tampoco lo harán), y se omitirán los métodos restantes del ciclo de vida.

**componentWillUpdate(nextProps, nextState)** [deprecated]: Este método está en desuso a partir de React 16.3, aunque probablemente tambien se encontrará código que lo usa. Utilizar *getSnapshotBeforeUpdate* en su lugar.

**render**: Se conoce bien este. Encaja en el ciclo de vida justo entre *componentWillUpdate* y *componentDidUpdate*.

**getSnapshotBeforeUpdate(prevProps, prevState)**: Este se llama después del renderizado, pero antes de que los cambios se confirmen en el DOM. Si se necesita hacer algún cálculo basado en el antiguo DOM (seguimiento de cambios a la posición de desplazamiento, etc.), aqui es el momento para hacerlo. Devolver todo lo que se desee de esta función, y ese valor se pasará como tercer argumento (**snapshot**) a *componentDidUpdate*. Usar para pasar cualquier cosa que se necesite para realizar un seguimiento entre las actualizaciones DOM.

**componentDidUpdate(prevProps, prevState, snapshot)**: El render fue realizado. Ya se han confirmado cambios al DOM. Utilizar este aqui da oportunidad para operar en el DOM si es necesario. Antes de esto, los nodos del DOM aún podrían estar en flujo. El argumento de la instantánea (*snapshot*) proviene de **getSnapshotBeforeUpdate**, si se devolvió algo desde allí.