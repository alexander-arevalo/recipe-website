import express from "express";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
import { conn } from "./config/db.js";
const PORT = 3001 || 3002;
const app = express();

conn();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
