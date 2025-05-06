// import express from "express";
// import path from "node:path";
// import db from "./config/connection.js";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import { typeDefs, resolvers } from "./schemas/index.js";
// import { authenticateToken } from "./services/auth.js";
// import { fileURLToPath } from "node:url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const app = express();
// const PORT = process.env.PORT || 3001;
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// const startApolloServer = async () => {
//   await server.start();
//   await db();
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.json());
//   app.use(
//     "/graphql",
//     expressMiddleware(server as any, {
//       context: authenticateToken as any,
//     })
//   );
//   // if we're in production, serve client/build as static assets
//   if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../../client/dist")));
//   }
//   app.listen(PORT, () => console.log(`:earth_africa: Now listening on localhost:${PORT}`));
// };
// startApolloServer();



import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import { authMiddleware } from "./auth.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({}),
    })
  );

  const PORT = process.env.PORT || 4000;
  mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/storeDB");

  mongoose.connection.once("open", () => {
    console.log("🟢 MongoDB connected");
    httpServer.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}/graphql`)
    );
  });
};

startApolloServer();
