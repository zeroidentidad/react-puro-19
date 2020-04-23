# Las Props:

Cuando los elementos HTML tienen "atributos", los componentes React tienen "props" (abreviatura de "propiedades"). Es un nombre diferente para esencialmente lo mismo.

Pensar en cómo se personalizaría una función simple. Esto puede parecer un poco básico, pero tener paciencia en el aprendizaje. Digamos que se tiene esta función:

```js
function greet() {
    return "Hi People";
}
```

Funciona bien, pero es bastante limitado ya que siempre devolverá "Hi People". ¿Qué pasa si se quiere saludar a alguien en especifico? Se pasaria su nombre como argumento:

```js
function greet(name) {
    return `Hi ${name}`;
}
```

Donde las funciones tienen argumentos, los componentes tienen props. Las props permiten pasar datos a sus componentes.