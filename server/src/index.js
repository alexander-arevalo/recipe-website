import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://recipe-website-rho.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

mongoose.connect(
  "mongodb+srv://zerocoding:Z3r0cod1inG@recipes.svvw5bf.mongodb.net/database?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server is running"));
