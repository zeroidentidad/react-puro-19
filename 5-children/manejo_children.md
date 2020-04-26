# Manejando uso Children

React proporciona funciones de utilidad para tratar con esta estructura de datos opacada.

```html
• React.Children.map(children, function)

• React.Children.forEach(children, function)

• React.Children.count(children)

• React.Children.only(children)

• React.Children.toArray(children)
```

Los dos primeros, map y forEach, funcionan igual que los métodos de Array integrado de JavaScript. Aceptan elementos secundarios, ya sea un elemento único o una matriz, y una función que se llamará para cada elemento. forEach itera sobre los elementos secundarios (children) y no devuelve nada, mientras que map devuelve una matriz compuesta de los valores que devuelve de la función que se proporciona.

**count** se explica por sí misma: devuelve el número de elementos en los children.

**toArray** igualmente intuitivo: convierte a los children en un array plano, ya sea un array o no.

**only** devuelve el hijo único o arroja un error si hay más de un hijo.

Se tiene acceso a cada elemento secundario individualmente, por lo que se puede reordenarlos, eliminar algunos, insertar nuevos, pasar los elementos hijos a otros elementos hijos, etc.