const Mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/server";
const urinew = process.env.MONGODB_URI;

Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = Mongoose.connection;
connection.once("open", function (error) {
  if (error) {
    console.log(error + " :this is a DB error here");
  } else {
    console.log("connection established for movie wheel");
  }
});

module.exports = Mongoose;
