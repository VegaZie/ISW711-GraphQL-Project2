const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// Configura la aplicación Express
const app = express();

const secretKey = process.env.SECRET_KEY;

// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGO_DATABASE_URL);

// Importa el esquema GraphQL
const { graphQLschema } = require("./schema/graphql-schema.js");

const {
  searchPromptsByName,
  searchPromptsByTags,
  promtGet,
} = require("./controllers/searchPromts");

// Define los resolvers para las operaciones de búsqueda
const graphqlResolvers = {
  byName: searchPromptsByName,
  byTags: searchPromptsByTags,
  getUserPromts: promtGet,
};



// check for cors
const cors = require("cors");
app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);
/**
 * Middleware para verificar el token JWT en las rutas protegidas.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para continuar con el siguiente middleware o ruta.
 */

app.use(function (req, res, next) {
  // Verificar si el token de autorización se encuentra en las cabeceras de la solicitud
  if (req.headers["authorization"]) {
    // Extraer el token del encabezado "Authorization"
    const authToken = req.headers["authorization"].split(" ")[1];

    try {
      // Verificar y decodificar el token utilizando la clave secreta
      jwt.verify(authToken, secretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          // Si hay un error o el token no es válido, enviar una respuesta de error de "Unauthorized"
          res.status(401);
          res.json({
            error: "Unauthorized",
          });
        } else {
          // Si el token es válido, continuar con el siguiente middleware o ruta
          next();
        }
      });
    } catch (e) {
      // Si ocurre un error durante la verificación del token, enviar una respuesta de error de "Unauthorized"
      res.status(401);
      res.send({
        error: "Unauthorized",
      });
    }
  } else {
    // Si no se proporciona un token de autorización, enviar una respuesta de error de "Unauthorized"
    res.status(401);
    res.send({
      error: "Unauthorized",
    });
  }
});
// Configura el middleware para GraphQL
app.use(
  "/api/graphql",
  graphqlHTTP({
    schema: graphQLschema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

// Inicia el servidor
const PORT = 3002;
app.listen(PORT, () => {
  console.log(
    `Servidor GraphQL funcionando en http://localhost:${PORT}/api/graphql`
  );
});
