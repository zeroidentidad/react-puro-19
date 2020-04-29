# Intro Hooks

Ya se sabe cómo los componentes de clase en React pueden mantener el estado y los componentes de función aun no?

Y cómo los componentes clase pueden tener ciclos de vida y los componentes funcionales no?

```js
• componentes de clase === componentes clase === class components === statefull components

• componentes de función === componentes funcionales === function components === stateless components
```

Bueno, los Hooks cambian todo eso.

Lanzados oficialmente como parte de React 16.8, los Hooks hacen posible tomar un componente de función en React y agregarle estado, o engancharse a métodos de ciclo de vida como componentDidMount y componentDidUpdate.

De ahora en adelante, si se escribe un componente de función y luego se decide que se necesita un poco el uso de estado, no se tiene que refactorizar todo en una clase. Esas funciones ya no se relegan a ser "componentes de funcion sin estado".

## Pero se ha aprendido clases!

Los Hooks no reemplazan las clases. Son solo una nueva herramienta que se puede usar, si se quiere. O si con este estilo resulta expresivo y sencillo de entender el codigo. 

- **El equipo de React ha dicho que no tienen planes de deprecar o dejar obsoletas las clases en React, por lo que si se desea seguir usándolas, no hay problema.** Quiza el problema sea con el estilo defendido y adoptado por la comunidad local o equipo de trabajo en el que toca estar.

