# Desmontaje

**componentWillUnmount**: El componente está a punto de desmontarse. Tal vez el elemento se eliminó de una lista, tal vez el usuario navegó a otra pestaña... en cualquier caso, el tiempo de este componente está numerado. Debe invalidarse cualquier temporizador que se haya creado (usando *clearInterval()*, o *clearTimeout()*), deshabilitar los controladores de eventos (con *removeEventListener()*) y realizar cualquier otra limpieza necesaria. Este método solo se llamará si se llamó a *componentDidMount*. Si el componente nunca se montó completamente (como si arrojó un error durante el primer renderizado), no se llamará a *componentWillMount*.