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

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/storeDB");

  mongoose.connection.once("open", () => {
    console.log("🟢 MongoDB connected");

    app.use(express.static(path.join(__dirname, '../client')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });

    httpServer.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}/graphql`)
    );
  });
};

startApolloServer();
