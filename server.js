import app from "./app.js";
import "dotenv/config";
import mongoose from "mongoose";

const connection = mongoose.connect(process.env.DATABASE_URL);

connection.then(
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  })
);
