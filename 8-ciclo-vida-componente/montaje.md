# Montaje

Estos métodos se llaman solo una vez, cuando el componente se monta por primera vez.

**constructor**: este es el primer método llamado cuando se crea el componente. Si el estado se inicializa con un inicializador de propiedades, ya estará establecido para cuando se ejecute el constructor.

**componentDidMount**: llamado inmediatamente después del primer render. Los elementos secundarios del componente ya se representan en este punto también. Este es un buen lugar para hacer solicitudes AJAX para obtener los datos que se necesitan.

**componentWillMount** [*deprecated*]: Hasta React 16.3, este método tenía un propósito similar al del constructor. Se ejecuta antes del primer render. Es probable que todavía se encuentre código que lo use, pero es probable que se elimine en React 17. Si se necesita recuperar datos o hacer cualquier otra cosa "antes" de un componente, simplemente hacerlo en *componentDidMount*. El renderizado se realiza rápidamente, por lo que no es necesario preocuparse por el rendimiento y, es probable que se desee mostrar un indicador de "loading...", un spinner o algo mientras el trabajo de carga está en progreso.

- *Como este ultimo, se avisa en la consola que en la versión posterior serán manejados como inseguros (UNSAFE_), de legado y que se sugiere manejar el cambio con un paquete de renombramiento para acoplar el cambio de nombre de los metodos a versión posterior.*