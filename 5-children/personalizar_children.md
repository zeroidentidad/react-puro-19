# Personalizar Children antes de renderizar

¿Qué pasaría si se quisiera hacer algo más expresivo, como crear una jerarquía propia de componentes personalizados?

Imaginar que se construye "API" propia para expresar un header de navegación:

```js
<Nav>
    <NavItem url='/' > Home </NavItem>
    <NavItem url='/about' > About </NavItem>
    <NavItem url='/contact' > Contact </NavItem>
</Nav>
```

Usando la prop para **children**, el componente Nav se puede hacer cosas como insertar un separador entre cada elemento:

```js
function Nav({ children }) {
    let items = React.Children.toArray(children);
    for ( let i = items.length - 1; i >= 1; i -- ) {
        items.splice(i, 0,
        <span key={i} className='separator' > | </span>
        );
    }
    
    return (
        <div> {items} </div>
    );
}
```

El código convierte a los hijos en un arreglo, luego recorre hacia atrás desde el final a medida que inserta un nuevo elemento entre cada elemento existente.