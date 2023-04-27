const express = require("express");
const app = express();
const tasks = require("./routers/tasks");

require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 3000;

// db connection
const connectDB = require("./db/connect");

// middleware
app.use(express.json());
app.use(express.static("./public"));

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server listening", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
