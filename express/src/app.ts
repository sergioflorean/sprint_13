import express from "express";
import mongoose from "mongoose";

import planetsRouter from "./routes/planets.js";

const app = express();

app.use(express.json());

app.use("/planets", planetsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});