const { buildSchema } = require("graphql");

exports.graphQLschema = buildSchema(`
type Query {
  byName(user_id: String!, name: String!): [Promt]
  byTags(user_id: String!, tags: [String]!): [Promt]
  getUserPromts(user_id: String!): [Promt]
}

type Image {
  url: String!
}

type Promt {
  id: ID!
  name: String
  model: String
  input: String
  instruction: String
  promt: String
  temperature: Float
  quantity: Int
  size: String
  response: String
  imageresponse: [Image]
  userID: String
  tags: [String]
  type: String
}`);
