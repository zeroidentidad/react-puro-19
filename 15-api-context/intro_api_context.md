# Intro API Context

En React 16.3 se agregó una nueva API Context, nueva en el sentido de que la antigua API Context era una característica detrás de escena que la mayoría de la gente desconocía o evitaba usar porque la documentación decía evitar usarla.

Hoy, sin embargo, la API Context es un miembro de primera clase en React, abierto a todos (no es que no lo fuera antes, pero ahora es oficial su mejora y adopción).

El propósito de Context es facilitar el paso de props profundamente anidadas. Context ayuda a solucionar la situación, a veces llamada "perforación de props" (prop drilling), donde un componente en lo alto del árbol necesita enviar datos a un nieto (o tatara tatara tataranieto) al enhebrar props a través de un grupo de componentes intermedios.