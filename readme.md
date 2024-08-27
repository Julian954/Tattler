Proyecto de API REST para Gestión de Comentarios y Favoritos de Restaurantes
Descripción
Este proyecto es una API REST desarrollada con Node.js y Mongoose que permite la gestión de usuarios, restaurantes, comentarios y favoritos. La API permite a los usuarios crear cuentas, agregar restaurantes a su lista de favoritos, y dejar comentarios y calificaciones sobre los restaurantes.

Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

Copy code
/src
    /models
        comment.js
        favorite.js
        restaurant.js
        user.js
    /routes
        commentRoutes.js
        favoriteRoutes.js
        restaurantRoutes.js
        userRoutes.js
    index.js
/node_modules
.env
package.json
package_lock.json
requests.http


Modelos
User: Modelo para gestionar usuarios, con campos como name, email, password, preference, entre otros. Las contraseñas se cifran antes de ser almacenadas en la base de datos.
Restaurant: Modelo que representa restaurantes, con detalles como name, address, altitud, longitud, horario, cuisine, y rating.
Comment: Modelo para comentarios, permitiendo a los usuarios dejar un comentario y una calificación sobre un restaurante específico.
Favorite: Modelo para favoritos, permitiendo a los usuarios agregar restaurantes a su lista de favoritos.

Rutas
commentRoutes.js: Maneja las rutas relacionadas con los comentarios, permitiendo crear, leer, actualizar y eliminar comentarios.
favoriteRoutes.js: Maneja las rutas para gestionar los favoritos, permitiendo agregar y eliminar restaurantes de la lista de favoritos de un usuario.
restaurantRoutes.js: Contiene las rutas para la gestión de restaurantes, incluyendo la creación, modificación, y consulta de restaurantes.
userRoutes.js: Define las rutas para la gestión de usuarios, como el registro, login, y actualización de la información del usuario.
Archivo Principal
index.js: Es el punto de entrada de la aplicación. Aquí se configuran el servidor, la conexión a la base de datos, y se importan las rutas y modelos necesarios para que la API funcione.
Instalación
Clona el repositorio:
git clone https://github.com/tu-usuario/tu-repositorio.git

Navega al directorio del proyecto:
cd tu-repositorio

Instala las dependencias necesarias:
npm install

Uso
Configuración de la Base de Datos
Asegúrate de tener MongoDB instalado y en ejecución. Luego, configura la URL de conexión en el archivo .env en la raíz del proyecto:
MONGODB_URI=mongodb://localhost:27017/nombre_de_tu_base_de_datos

Ejecución de la API
Para ejecutar la API en modo de desarrollo:

npm run dev
La API estará disponible en http://localhost:3000.


Ejemplos de Uso

Crear un Usuario

POST /api/users
json
Copy code
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "preference": ["Italian", "Mexican"]
}

Agregar un Restaurante

POST /api/restaurants
json
Copy code
{
  "name": "La Pizzeria",
  "address": "123 Main St",
  "altitud": 34.0522,
  "longitud": -118.2437,
  "horario": [{"day": "Monday", "open": "9:00 AM", "close": "10:00 PM"}],
  "cuisine": ["Italian"],
  "rating": 4.5
}

Dejar un Comentario

POST /api/comments
json
Copy code
{
  "userId": "605c6b66f8a2b724d89e1e23",
  "restaurantId": "605c6b66f8a2b724d89e1e24",
  "comment": "Great place!",
  "rating": 5
}

Agregar un Restaurante a Favoritos

POST /api/favorites
json
Copy code
{
  "userId": "605c6b66f8a2b724d89e1e23",
  "restaurantId": "605c6b66f8a2b724d89e1e24"
}

Dependencias
Node.js: Entorno de ejecución de JavaScript.
Express: Framework para construir aplicaciones web.
Mongoose: ODM para MongoDB.
bcrypt: Biblioteca para cifrar contraseñas.