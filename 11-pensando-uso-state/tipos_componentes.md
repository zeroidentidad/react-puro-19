## "Tipos" de componentes

Arquitectónicamente, pueden segmentarse los componentes en dos tipos: Presentacional (alias "Tonto") y Contenedor (alias "Inteligente").

Los componentes **Presentacionales** no tienen estado. Simplemente aceptan props y renderizan algunos elementos basados en esas props. Un componente sin estado generalmente contendrá menos lógica y será más fácil de depurar y probar. Son, en esencia, funciones puras. Siempre devuelven el mismo resultado para un conjunto dado de props, y no cambian nada. Idealmente, la mayoría de componentes serán de presentación.

Los componentes **Contenedores** tienen estado. Mantienen el estado para sí mismos y para cualquier componente hijo, y se lo transmiten a través de props. Por lo general, pasan las funciones del controlador a los hijos y responden a las devoluciones de llamada actualizando su estado interno. Los componentes de contenedor también son responsables de comunicación asincrónica, como las llamadas AJAX a servidor.

En un mundo ideal, se trataría de organizar la aplicación para que los componentes en el nivel más alto (y tal vez un nivel por debajo) sean contenedores, y todo debajo de ellos sea de presentación. En el mundo real, esto es difícil de lograr porque es posible que se tengan entradas anidadas que contienen su propio estado o requisitos más complicados. Sin embargo, está bien, nada es perfecto.