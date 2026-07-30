import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js"
import cors from "cors";
import router from './routes/fileRoute.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use('/', router);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

connectDB();