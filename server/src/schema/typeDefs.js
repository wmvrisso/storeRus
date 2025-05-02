
const typeDefs = `
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
  
  type CartItem{
    id: ID!
    productId: String!
    title: String
    price: String
    image: String
    quantity: Int
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
    me:User
    getSingleUser: User
    getCart: [CartItem]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addToCart(productData: ProductInput!): CartItem
    deleteProduct(productId: String!): User
  }
`;

export default typeDefs;
