import express from "express";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
import { conn } from "./config/db.js";

const PORT = process.env.PORT || 3001;
const app = express();

conn();
app.use(express.json());

// CORS middleware
app.use(cors());

// Routes
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

// Wildcard route for CORS preflight requests
app.options("*", cors());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
