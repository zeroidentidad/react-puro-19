# Reglas de los Hooks

Algunas reglas a seguir:

1. Solo llamar a los hooks al principio/top del cuerpo de la función. No colocar en bucles, condicionales o funciones anidadas. Para que React realice un seguimiento de los hooks, los mismos deben llamarse en el mismo orden cada vez. Si se llamó a useState desde dentro de un if, por ejemplo, y se ejecutó durante el primer render pero se omitió durante el segundo, React estaría confundido.

2. Solo llamar a los hooks desde los componentes de función, o de los hooks personalizados. No llamar desde fuera de un componente. Mantener todas las llamadas dentro de componentes y hooks personalizados hace que al código sea más fácil darle seguimiento, porque toda la lógica relacionada está agrupada.

3. Los nombres de los hooks personalizados deben comenzar con "use". Como useState o useEffect (bueno, esos dos no, pues ya existen en React).

El equipo de React creó algunas reglas para ESLint para detectar el uso problemático de los hooks (esas reglas están integradas para crear proyectos con Create React App) y el linter necesita una forma de identificar cómo es "un hook". De ahí el prefijo de nombre. El linter podrá advertir si se viola la regla 1 o 2, pero solo si se sigue la regla 3.