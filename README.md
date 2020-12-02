# MeLiChallenge

  - [Instalación](#instalacion)

[Tecnologias utilizadas](#Tecnologias)
  - [Back end](#back-end)
  - [Front End](#front-end)

[Vistas](#vistas)
  - [Search Items](#buscar-items)

[Comentarios](#comentarios)


### Instalación

Clonarlo:

```
git clone https://github.com/sebdemaria/MeLiChallenge.git
```

Backend:

```
cd MeLiChallenge
cd back-meli
npm install
npm start
(runnning at port 9000)
```

Frontend:

```
cd MeLiChallenge
cd front-meli
npm install
npm start
(running at port 3000)
```
Para acceder al sitio usar http://localhost:3000/

## Tecnologias

### Back End
```
NodeJs,Express
```

### Front End
```
React,Sass, Bootstrap
```

## Vistas

Las paginas son 100% responsive con utilizacion del grid system de bootstrap y scss.

# Comentarios

## SEO:
Se realiza las llamadas a api de express en `getResults()` lo que genera las llamadas del lado del server lo que nos ayuda a no perder posicionamiento en google al ser analizada la pagina por levantar un browser para poder ver el sitio. Genera un poco mas de tiempo de carga en el sitio pero el posicionamiento es mejor. También utilice algunos tags de html como STRONG que proporciona una ayuda extra en el posicionamiento.

## Puntos de vista:

#### Categorias:
En el caso de la vista del producto la api proporcionada para el challenge no otorgaba el nombre de la categoria especifica del producto a mostrar sino un ID, por lo que tuve que generar un 3er request para poder traer el nombre de la misma desde ``https://api.mercadolibre.com/categories/CATEGORY_ID`` otorgándole el category id obtenido mediante las apis otorgadas para la description del item y la data del item en si.

Por otro lado en el caso del buscador tuve que modificar un poco el formato del endpoint solicitado en el challenge agregandole la ciudad donde el producto es vendido, para asi no tener que realizar otro request y aparte para respetar el formato del enpoint, lo cual consumiria mas recursos y el tiempo de carga de la pagina seria mayor. De esta manera logro imprimir facilmente la ciudad en el listadod de productos buscados.

Se implemento el package de npm cors para poder realizar la busqueda en la api y no ser rechazado por falta de permisos. Esto genera un poco de retraso en la busqueda pero es necesario de lo contrario no se podrá realizar la búsqueda.

#### Cantidad de productos en una busqueda

En la view del buscador ("/") se ingresa el pedido a buscar y eso nos redirije a la pagina de SearchResults ("/items?q="), que nos imprime los resultados teniendo como limite 4 productos. Esto fue un requerimiento en el challenge y se implemento en la llamada a la api pasandole como parametro `&limit=4` al final de la request.

#### Vista de un item especifico

Al ingresar un id de producto, debería poder ingresar directamente a la vista de detalle de producto.

Logramos lo dicho realizando una request a la api de meercado libre proporcionada 
``https://api.mercadolibre.com/items/​:id`` y ``https://api.mercadolibre.com/items/​:id​/description``
y formateando las 2 respuestas en una sola como fue pedido, generando un entry point personalizado que se consultará desde React. Como se aclara mas arriba se debió realizar un 3er request para la obtención literal de la categoría específica del producto, así si el usuario ingresa al ID específico de uno, la categoría se imprime perfectamente sin necesidad de llamarla desde la pagina de resultados de busqueda, lo que generaría la obligatoriedad al usuario de realizar un solo flujo de navegación para imprimirla (busqueda, producto).

## Información extra :

#### Botón de compra

El botón de `comprar` es funcional, al mismo se le agrego un Modal de React-bootstrap que al hacer click simula una compra e imprime un modal indicando que hemos realizado la compra y que tenemos la opcion de seguir comprando enviandonos nuevamente al inicio ("/"), si se oprime en otro lado de la pantalla o se utiliza ESC, el modal se cierra y se puede continuar en la página que nos encontrabamos al momento.


