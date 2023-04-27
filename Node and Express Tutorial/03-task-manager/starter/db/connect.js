const mongoose = require("mongoose");

// const connectionString =
//   "mongodb+srv://root:root@nodeexpressprojects.k2iu5vy.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

//   .then(() => console.log("CONNECTED TO THE DB..."))
//   .catch((err) => console.log(err));

module.exports = connectDB;
