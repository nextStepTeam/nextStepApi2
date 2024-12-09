// src/index.js
import express from "express";
import corsMiddleware from "./middleware/cors.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();
const port = 8080;

connectDB();

app.use(corsMiddleware);
app.use(express.json());
app.use("/users", userRoutes);

let server;

const startServer = () => {
  server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};
startServer();
export { startServer, server };
