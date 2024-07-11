import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookSchema.js";
import bookRoute from './routes/bookRoute.js';
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome");
  return res.status(200).send("welcome to mern stack");
});

//MIDDLEWARE FOR HANDLING CORS POLICY
//OPTION 1:ALLOW ALL ORIGIN WITH DEFAULT OF CORS(*)
app.use(cors());

//OPTION:2 ALLOW CUSTOM ORIGIN
// app.use(
//   cors({
//     origin:'http://localhost:8000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeader:['Content-Type'],
//   })
// )

app.use('/books',bookRoute);





mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected To DataBase");
    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
