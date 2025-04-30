import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    ProductCount: Int
    savedProducts: [Product]
  }

  type Product {
    productId: String!
    title: String
    price: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input ProductInput {
    productId: String!
    title: String
    price: String
    image: String
  }

  type Query {
    getSingleUser: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveProduct(productData: ProductInput!): User
    deleteProduct(productId: String!): User
  }
`;

export default typeDefs;
