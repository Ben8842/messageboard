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
const user = require("./models/user");

app.use(express.json());
//mongoose.set("useFindAndModify", false);

//example
app.post("/users", (req, res) => {
  console.log("posting");
  console.log(req.body);
  const body = req.body;
  const userObject = new user(body);

  user.findOneAndUpdate(
    { name: "theName" },
    {
      $push: { movieNames: req.body.movieName },
    },

    (error, data) => {
      console.log(req.body.movieNames);
      console.log(error + "hi");
      return res.json();
    }
  );
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
