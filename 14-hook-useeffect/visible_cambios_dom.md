# Hacer cambios visibles del DOM

La función useEffect es como navaja suiza de hooks. Se puede usar para un montón de cosas, desde establecer suscripciones hasta crear y limpiar temporizadores para cambiar el valor de una referencia.

Una cosa para la que no es bueno, es hacer cambios del DOM que sean visibles para el usuario. La forma en que funciona en el tiempo, una función de efecto solo se activará después de que el navegador haya terminado con el diseño y dibujo de elementos, demasiado tarde, si se desea realizar un cambio visual.

Para esos casos, React proporciona el hook *useLayoutEffect*. Funciona igual que *useEffect* en términos de los argumentos que toma. La única diferencia es que se ejecutará al mismo tiempo que lo haría componentDidMount, es decir, se ejecuta sincrónicamente cuando el navegador ha actualizado el DOM y antes de que esos cambios se muestren en la pantalla.

La mayoría de las veces, useEffect es el que se desea o debe usar. Y debido a que useEffect se ejecuta después del diseño y dibujo de elementos, un efecto lento no hará que la interfaz de usuario sea irregular.

Pero si el efecto necesita medir elementos DOM o cambiarlos de alguna manera visible, escribir en [useLayoutEffect](https://es.reactjs.org/docs/hooks-reference.html#uselayouteffect).