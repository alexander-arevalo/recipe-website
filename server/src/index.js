import express from "express";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
import { conn } from "./config/db.js";

const PORT = process.env.PORT || 3001;
const app = express();

conn();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Routes
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log("API is running!");
});
