# Intro

Ahora que se sabe sobre el estado y los ciclos de vida, se puede hablar sobre cosas como: obtener datos de un servidor y mostrarlos!

Sin embargo, se debe entender que React en sí no tiene lealtad a ninguna forma particular de obtener datos. En lo que respecta a React, ni siquiera sabe que hay un "servidor" en la imagen de fuente de datos.

React simplemente renderiza componentes, utilizando datos de solo dos lugares: **props** y **state**. Ya que se ha aprendido lo esencial de React. Se ve que no hay funciones integradas para realizar llamadas HTTP; sin secretos ocultos.

Por lo tanto, para mostrar datos del servidor, se debe obtener esos datos en las props o el state de los componentes.