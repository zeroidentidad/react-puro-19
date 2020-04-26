# Diferentes tipos de Children

La prop children siempre está pluralizada como children, sin importar si hay un solo hijo o varios hijos. Esto significa que los elementos secundarios pueden ser un solo elemento o un arreglo, según lo que se haya pasado.

Cuando hay varios hijos, children será un array de ReactElements.

Cuando solo hay un hijo, es un objeto ReactElement.

Esto puede parecer un poco extraño: ¿no sería más fácil trabajar si los children siempre fueran un array?

Pues sí. Pero los children se usan con tanta frecuencia y el caso de uso de un solo hijo es tan común que el equipo de React decidió optimizarlo al no asignar una matriz cuando solo hay un hijo.