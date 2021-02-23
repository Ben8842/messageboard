//installation advice at bottom of file
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const path = require("path");

const { getMaxListeners } = require("./models/user");
const message = require("./models/message");
const user = require("./models/user");

app.use(express.json());
//mongoose.set("useFindAndModify", false);
app.post("/messages", (req, res) => {
  console.log("posting messages");
  const body = req.body;
  const messageObject = new message(body);
  console.log(body);
  messageObject.save();
});
//example
//below here app.post("/users" is associated with the name of your db collection
//the db name is associated with the uri in the db.js file
app.post("/users", (req, res) => {
  console.log("posting");
  console.log(req.body);
  const body = req.body;
  const userObject = new user(body);
  if (body.overName == "theName") {
    user.findOneAndUpdate(
      { name: "theName" },
      {
        $push: { movieNames: req.body.movieName },
      },

      (error, data) => {
        console.log(req.body.movieName);
        console.log(error + "hi");
        return res.json();
      }
    );
  } else {
    user.findOneAndUpdate(
      { name: "theName" },
      {
        $pull: { movieNames: body.holder },
      },

      (error, data) => {
        console.log(req.body.movieName);
        console.log(error + "hi");
        return res.json();
      }
    );
  }
});

app.get("/messages", (req, res) => {
  console.log("GETTING MESSAGE");

  message
    .find(
      {},

      (error, data) => {
        console.log(JSON.stringify(data) + "stringify");
        return res.json(data);
      }
    )
    .sort("-createdAt");
});

app.delete("/messages/:id", (req, res) => {
  console.log("we are deleting", req.params);
  // message.findOneAndDelete({ _id: req.params.id });
  message.findByIdAndDelete(req.params.id, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("delete is a success");
    }
  });
  // message.deleteOne({ _id: "ObjectId(" + req.params.id + ")" });
  res.send("delete message here");
});

app.get("/users", (req, res) => {
  console.log("GETTING");
  console.log(req.body);
  const body = req.body;
  const userObject = new user(body);

  user.find(
    { name: "theName" },

    (error, data) => {
      console.log(JSON.stringify(data) + "stringify");
      return res.json(data);
    }
  );
});

//end of example

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Hello Server Running on " + port);
});

/* installation steps for creating new database (with mongodb and mongoose and express and node.js)
these steps are in order to run a new database locally.  structure should have react folder directory with a server directory inside that react folder

(install these below in the server directory (not the react application directory))
npm install express --save

npm install mongoose --save



switch uriold and uri old variables

compass create database.  give name as folder name (perhaps server in this case if folder is named server)
give name to collection that is associated with app.post or app.get calls ("/users?, (req, res) => { 
so in this case it should be users .....


readme usually has # with name of folder in it, not sure why . . . 


npm install cors--save


INSIDE THE SERVER.JS near top . . . 
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

then you need to 
INSIDE db.js file near top
Mongoose.set("useFindAndModify", false);

*/
