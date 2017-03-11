# Parcial Web Flickr+React+Node+Mongo

Este repositorio cuenta con dos ramas la primera para desarrollo, la segunda para el despliegue en heroku.
La aplicación desplegada en heroku puede verse [aquí.](https://parcialflickr.herokuapp.com/)


# Para probar de manera local el proyecto

```
git clone https://github.com/dalthviz/nodeExpressFlickr.git parcialWEB
cd parcialWEB
npm install
```
## Opción 1

Posteriormente se deben iniciar dos terminales, una para correr el frontend y otra para correr el backend

Para iniciar el frontend (queda en http://localhost:3000):
```
npm start
```
Para poner a correr el backend (queda en http://localhost:9000):
```
node server
```
**Nota:** Para que esta aproximación funcione el backend debe de estar corriendo primero (para que las peticiones tengan a donde llegar).

## Opción 2

Otra posibilidad, para correr el proyecto, es mediante el uso únicamente del servidor para el backend y teniendo el frontend como recurso estático, en este caso:

Para generar los archivos estáticos del frontend:
```
npm run build
```
Para correr el backend (queda corriendo en http://localhost:9000):
```
node server
```
Ir a http://localhost:9000 debería mostrar el frontend, además de aceptar peticiones como el api del backend

# API backend

Se pueden hacer, además de la petición inicial para flickr, peticiones para comentarios de las fotos:

```
GET /fotos/:id_foto/comentarios  -> comentarios que la foto a recibido
``` 

``` 
POST /comentarios -> agregar un comentario de la forma:

{
  'comentario': 'El comentario',
  'id_foto': '1775891859'
}
``` 
**Nota**: También hay una opción para `PUT` y para `DELETE` de comentarios pero no son usadas por el frontend.

# Funcionalidad extra

En teoría entonces debería permitir escribir comentarios sobre las fotos y guardarlos en una base de datos en mongo (la actualización para mostrarlos no es la mejor pero persisten)..., además de mostrar fotos de un mismo color por columnas teniendo encuenta además una término de búsqueda.

# Recursos

Basado en el [boilerplate](https://github.com/john-guerra/nodeExpressFlickr)
