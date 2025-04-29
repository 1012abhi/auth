import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});


import userRoutes from "./routes/user.routes.js";
app.use("/api/user", userRoutes);

app.listen(PORT, () => {    
  console.log(`Server is running on http://localhost:${PORT}`);
});