# GraphQL API para búsqueda filtrada de datos

Este proyecto consiste en un backend desarrollado en Node.js y Express que proporciona una API basada en GraphQL para realizar búsquedas filtradas en una base de datos MongoDB. La API permite buscar promts almacenados en la base de datos utilizando filtros como el nombre y las etiquetas.

## Configuración

Para utilizar esta API, sigue los pasos a continuación:

1. Clona este repositorio en tu máquina local.

2. Instala las dependencias utilizando npm:

`npm install`

3. Crea un archivo `.env` basado en el archivo `.env.template` y proporciona la URL de conexión a tu base de datos MongoDB.

4. Asegúrate de tener MongoDB instalado y en funcionamiento.

5. Ejecuta el servidor utilizando el siguiente comando:

`npm start`

El servidor se ejecutará en `http://localhost:3002/api/graphql`.

## Endpoints

La API proporciona los siguientes endpoints GraphQL:

### 1. Búsqueda por nombre

`Query: byName(user_id: String!, name: String!): [Promt]`

Este endpoint permite buscar promts por nombre. Debes proporcionar el `user_id` del usuario para obtener los promts asociados a ese usuario y el `name` que deseas buscar. La búsqueda es insensible a mayúsculas y minúsculas.

### 2. Búsqueda por etiquetas

`Query: byTags(user_id: String!, tags: [String]!): [Promt]`


Este endpoint permite buscar promts por etiquetas. Debes proporcionar el `user_id` del usuario para obtener los promts asociados a ese usuario y un array de `tags` que deseas buscar.

## Estructura del proyecto

- `index.js`: Archivo principal del servidor Express que configura la conexión a la base de datos y define los endpoints GraphQL.
- `./schema/graphql-schema.js`: Define el esquema GraphQL que incluye las operaciones de búsqueda por nombre y por etiquetas.
- `./models/promtModel.js`: Define el modelo de datos de los promts y la estructura de la base de datos MongoDB.
- `./controllers/searchPromts.js`: Contiene los controladores que realizan las consultas a la base de datos para buscar promts por nombre y etiquetas.

## Dependencias principales

- Express: Framework de servidor web para Node.js.
- Express-graphql: Middleware para Express que permite integrar GraphQL en el servidor.
- GraphQL: Biblioteca para construir APIs basadas en GraphQL.
- Mongoose: ODM (Object-Document Mapper) que facilita la interacción con MongoDB.
- Dotenv: Librería para cargar variables de entorno desde archivos `.env`.
