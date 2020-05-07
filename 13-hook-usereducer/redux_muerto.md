## Entonces, Redux murió?

El primer pensamiento al ver el hook useReducer es algo así como... "bueno, React tiene reductores integrados ahora, y tiene la API Context para pasar datos, así que Redux está muerto!" Hay reflexionar sobre eso aquí.

No se cree que useReducer matará a Redux más de lo que la API Context mató a Redux (no lo hizo). Se cree que useReducer amplía aún más las capacidades de React en términos de gestión del estado, por lo que los casos en los que realmente se necesita Redux podrían reducirse.

Redux proporciona un almacen (store) global donde pueden mantenerse los datos de la aplicación centralizados. useReducer está localizado en un componente específico. Sin embargo, nada impide construir un propio mini-Redux con useReducer y useContext.

Redux todavía hace más que Context + useReducer combinado: tiene las herramientas de desarrollo (Redux DevTools) para depuración agradable y middleware para personalización, y un ecosistema completo de librerias auxiliares. El otro gran beneficio es que Redux incluye optimizaciones de rendimiento de forma predeterminada, mientras que con la API Context debe tenerse cuidado para evitar el renderizado con demasiada frecuencia.

Puede argumentarse con seguridad que Redux se usa en muchos lugares donde es excesivo (incluyendo ejemplos simples que enseñan cómo usarlo), pero puede todavía tiene un poder de adherencia a usarse.