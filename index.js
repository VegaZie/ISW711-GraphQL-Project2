const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGO_DATABASE_URL);

// Importa el esquema GraphQL
const { graphQLschema } = require("./schema/graphql-schema.js");

const {
  searchPromptsByName,
  searchPromptsByTags,
  promtGet
} = require("./controllers/searchPromts");

// Define los resolvers para las operaciones de búsqueda
const graphqlResolvers = {
  byName: searchPromptsByName,
  byTags: searchPromptsByTags,
  getUserPromts: promtGet
};

// Configura la aplicación Express
const app = express();

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
