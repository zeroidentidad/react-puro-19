# PropTypes para Children

Si se desea que el componente acepte cero, uno o más elementos secundarios, usar el validador **.node**:

```js
propTypes : {
    children : PropTypes.node
}
```

Si se quiere que acepte un solo hijo, usar el validador **.element**:

```js
propTypes : {
    children : PropTypes.element
}
```

Tener en cuenta que esto espera un solo elemento React como hijo. Esto significa que tiene que ser un componente personalizado o una etiqueta como < div >. **PropTypes.element** avisará si se pasa una cadena o número.

Si se necesita permitir un elemento o una cadena, se puede usar el validador de **node** (que aceptará elementos,
cadenas y más) o ser más explícito con un validador oneOfType como este:

```js
propTypes : {
    children : PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ])
}
```

Al igual que con cualquier otro propType, son opcionales a menos que se agregue **.isRequired**.