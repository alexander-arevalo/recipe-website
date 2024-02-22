import express from "express";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
import { conn } from "./config/db.js";

const PORT = process.env.PORT || 3001;
const app = express();

conn();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "https://recipe-website-blush.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
