// import dotenv package and configure it.
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

// imports routes to app.js from authRouter in routes folder
const authRouter = require("./routes/authRouter");

// imports routes to app.js from movieRouter in routes folder
const movieRouter = require("./routes/movieRouter");

const bookmarkRouter = require("./routes/bookmarkRouter");

// import the error file from middleware folder
const error = require("./middlewares/error");

// spins up a new express application
const app = express();

// creating the port
const port = 4000;

app.use(cors())

//a middleware that allows access to the req.body on all request(without this, you can't test on postman)
app.use(express.json());

// middelware for login and register for authentication router
app.use("/api/auth", authRouter);

// middleware for movie router

app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

// custom middleware for errors
app.use(error);

// start listening on a given port and run the callback function when it does
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected!");

    await app.listen(port, () => {
      console.log(`server is running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

start();

// manuelokpodu
// jl2J1a6Bm0ppivg1
// mongodb+srv://manuelokpodu:jl2J1a6Bm0ppivg1@cluster0.njf12.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
