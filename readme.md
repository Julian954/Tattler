# Proyecto de API REST para Tattler

Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB, que permite gestionar usuarios, restaurantes, comentarios y favoritos. La API está diseñada para ofrecer una interfaz eficiente y segura para aplicaciones que requieren gestión de contenido y relaciones entre usuarios y lugares.

## Características Principales ✨
 ___Gestión de Usuarios___: Registro, actualización, visualización y eliminación de usuarios.
 
 ___Gestión de Restaurantes___: Creación, actualización, visualización y eliminación de restaurantes, con validación para evitar duplicados.
 
 ___Gestión de Comentarios___: Los usuarios pueden dejar comentarios y calificaciones en restaurantes.
 
 ___Gestión de Favoritos___: Los usuarios pueden marcar restaurantes como favoritos para un acceso rápido.

## Requisitos Previos 🛠️
Antes de comenzar, asegúrate de tener instalado lo siguiente:


_express_ (versión 4.19.2 o superior)

_Mongoose_ (versión 8.5.3 o superior)

_Dotenv_ (versión 16.4.5 o superior)

_Bcrypt_ (versión 5.1.1 o superior)


## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

```
|--/src
    |---/models
        |---comment.js
        |---favorite.js
        |---restaurant.js
        |---user.js
    |---/routes
        |---commentRoutes.js
        |---favoriteRoutes.js
        |---restaurantRoutes.js
        |---userRoutes.js
    |---index.js
|--/node_modules
|--.env
|--package.json
|--package_lock.json
|--requests.http
```


## Instalación 🖥️

Sigue estos pasos para instalar el proyecto localmente:

##### 1. Clona el repositorio:
```
git clone https://github.com/Julian954/Tattler.git
cd Tattler
```
##### 2. Instala las dependencias:
```
npm install
```
## Configuración ⚙️
##### Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y añade la configuración necesaria:
```
PORT=3000
MONGODB_URI= Enlace_de_conexion_con_la_base_de_datos_mongodb
```
## Conexión a MongoDB:

La aplicación se conecta automáticamente a MongoDB utilizando la URL proporcionada en el archivo .env. Si la conexión es exitosa, verás un mensaje en la consola.

```
> tattler@1.0.0 start 
> nodemon src/index.js

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/index.js`
Server listening on port 3000
Connected to MongoDB
```


## Uso 🚀
Para iniciar la aplicación en modo de desarrollo:
```
npm run start
```
La API estará disponible en http://localhost:3000.


## **Rutas de la API** 🌐

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/users` | Obtiene todos los usuarios |
| `POST` | `/api/users` | Crea un nuevo usuario |
| `GET` | `/api/users/:id` | Obtiene un usuario por ID |
| `PUT` | `/api/users/:id` | Actualiza un usuario por ID |
| `DELETE` | `/api/users/:id` | Elimina un usuario por ID |
| `GET` | `/api/restaurants` | Obtiene todos los restaurantes |
| `POST` | `/api/restaurants` | Crea un nuevo restaurante |
| `GET` | `/api/restaurants/:id` | Obtiene un restaurante por ID |
| `PUT` | `/api/restaurants/:id` | Actualiza un restaurante por ID |
| `DELETE` | `/api/restaurants/:id` | Elimina un restaurante por ID |
| `GET` | `/api/comments` | Obtiene todos los comentarios |
| `POST` | `/api/comments` | Crea un nuevo comentario |
| `GET` | `/api/comments/:id` | Obtiene un comentario por ID |
| `PUT` | `/api/comments/:id` | Actualiza un comentario por ID |
| `DELETE` | `/api/comments/:id` | Elimina un comentario por ID |
| `GET` | `/api/favorites` | Obtiene todos los favoritos |
| `POST` | `/api/favorites` | Agrega un restaurante a favoritos |
| `GET` | `/api/favorites/:id` | Obtiene un favorito por ID |
| `DELETE` | `/api/favorites/:id` | Elimina un favorito por ID |



## Modelos
`User`: Modelo para gestionar usuarios, con campos como name, email, password, preference, entre otros. Las contraseñas se cifran antes de ser almacenadas en la base de datos.

`Restaurant`: Modelo que representa restaurantes, con detalles como name, address, altitud, longitud, horario, cuisine, y rating.

`Comment`: Modelo para comentarios, permitiendo a los usuarios dejar un comentario y una calificación sobre un restaurante específico.

`Favorite`: Modelo para favoritos, permitiendo a los usuarios agregar restaurantes a su lista de favoritos.

## Rutas
`commentRoutes.js`: Maneja las rutas relacionadas con los comentarios, permitiendo crear, leer, actualizar y eliminar comentarios.

`favoriteRoutes.js`: Maneja las rutas para gestionar los favoritos, permitiendo agregar y eliminar restaurantes de la lista de favoritos de un usuario.

`restaurantRoutes.js`: Contiene las rutas para la gestión de restaurantes, incluyendo la creación, modificación, y consulta de restaurantes.

`userRoutes.js`: Define las rutas para la gestión de usuarios, como el registro, login, actualización de la información del usuario y eliminacion del usuario.

## Archivo Principal
`index.js`: Es el punto de entrada de la aplicación. Aquí se configuran el servidor, la conexión a la base de datos, y se importan las rutas y modelos necesarios para que la API funcione.

## Ejemplos de Uso

### Crear un Usuario

`POST /api/users`

example:
```
POST http://localhost:3000/api/users HTTP/1.1
Content-Type: application/json

{
    "name":"Jose chungus",
    "email":"MetaJose@gmail.com",
    "password":"Reparto123",
    "preference": ["Peruana", "Brazilena"],
    "active":true
}
```
respuesta:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 297
ETag: W/"129-ob5kmrOiqzaiZshWajd+h0GKFuk"
Date: Thu, 29 Aug 2024 17:23:47 GMT
Connection: close

{
  "name": "Jose chungus",
  "email": "MetaJose@gmail.com",
  "password": "$2b$10$cwEkZ.jhI28LuDvg4FHfL.Yr2GecsxarkO4JJJdJDDoQNVYuGJdim",
  "preference": [
    "Peruana",
    "Brazilena"
  ],
  "active": true,
  "_id": "66d0aea3d5e962294af3b4cf",
  "createdAt": "2024-08-29T17:23:47.389Z",
  "updateDate": "2024-08-29T17:23:47.389Z",
  "__v": 0
}
```
### Mostrar Usuarios

`GET /api/users`
example:
```
GET http://localhost:3000/api/users HTTP/1.1
```
respuesta:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 891
ETag: W/"37b-XG5FNoFrTgKEXbkY8GcqaKkLupg"
Date: Thu, 29 Aug 2024 17:25:14 GMT
Connection: close

[
  {
    "_id": "66c7da758332a9a05ee5f800",
    "name": "Julian Sanchez",
    "email": "julian@gmail.com",
    "password": "$2b$10$xloW7o9gIm4za30woucfiuaoht235.reRTaIPp0RxycsQ14eABVyS",
    "preference": [
      "italiana",
      "mexicana"
    ],
    "active": true,
    "createdAt": "2024-08-23T00:40:21.569Z",
    "updateDate": "2024-08-23T00:40:21.569Z",
    "__v": 0
  },
  {
    "_id": "66c97760d4ed89a2eb44819b",
    "name": "Pedro Mendez",
    "email": "Lopster@gmail.com",
    "password": "$2b$10$sQzGlh5cCi/E6a6M.cnh9.zHE8w6FksrhN4fUfWcXRGbLIkNt1PfK",
    "preference": [
      "Arabe",
      "Italiana"
    ],
    "active": true,
    "createdAt": "2024-08-24T06:02:08.745Z",
    "updateDate": "2024-08-24T06:03:50.965Z",
    "__v": 0
  },
  {
    "_id": "66d0aea3d5e962294af3b4cf",
    "name": "Jose chungus",
    "email": "MetaJose@gmail.com",
    "password": "$2b$10$cwEkZ.jhI28LuDvg4FHfL.Yr2GecsxarkO4JJJdJDDoQNVYuGJdim",
    "preference": [
      "Peruana",
      "Brazilena"
    ],
    "active": true,
    "createdAt": "2024-08-29T17:23:47.389Z",
    "updateDate": "2024-08-29T17:23:47.389Z",
    "__v": 0
  }
]
```
### Mostrar un Usuario

`GET /api/users/:id`
example:
```
GET http://localhost:3000/api/users/66cfa1b2827cc5c2000b45dd HTTP/1.1
```
resultado:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 297
ETag: W/"129-YIfnQ2Ia5RjHiYUmLetA0fAXVao"
Date: Thu, 29 Aug 2024 17:26:25 GMT
Connection: close

{
  "_id": "66c7da758332a9a05ee5f800",
  "name": "Julian Sanchez",
  "email": "julian@gmail.com",
  "password": "$2b$10$xloW7o9gIm4za30woucfiuaoht235.reRTaIPp0RxycsQ14eABVyS",
  "preference": [
    "italiana",
    "mexicana"
  ],
  "active": true,
  "createdAt": "2024-08-23T00:40:21.569Z",
  "updateDate": "2024-08-23T00:40:21.569Z",
  "__v": 0
}
```
### Actualizar un Usuario
`PUT /api/users/:id`
example:
```
PUT http://localhost:3000/api/users/66cfa1b2827cc5c2000b45dd HTTP/1.1
Content-Type: application/json

{
    "name":"Pedro Mendez",
    "email":"Lopster@gmail.com",
    "preference": ["Arabe", "Italiana"],
    "active":true
}
```
resultado:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 92
ETag: W/"5c-XE4LqSKK8lMBgnDPfq7vp2yCSG8"
Date: Thu, 29 Aug 2024 17:27:28 GMT
Connection: close

{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

### Eliminar un Usuario

`DELETE /api/users/:id`

example:
```
DELETE http://localhost:3000/api/users/66cfa1b2827cc5c2000b45dd HTTP/1.1
```
respuesta:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-fgR5yLHQ1Hpp6zDESHaY9wJreYE"
Date: Thu, 29 Aug 2024 17:27:57 GMT
Connection: close

{
  "acknowledged": true,
  "deletedCount": 1
}
```

### Nota:

Para informacion mas detallada sobre el codigo puedes revisarlo en el [Notion](https://aged-halloumi-cd7.notion.site/Ciclo-2-b50def6ccbd54bcd8ae6d47676dad413)
