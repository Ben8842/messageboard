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
      console.log(req.body.movieName);
      console.log(error + "hi");
      return res.status(400).send("push complete i think");
    }
  );
  /*
  userObject.save(function (error) {
    console.log("saving");
    if (error) {
      console.log(error + "issue");
    } else {
      return res.status(201).send("addition complete");
    }
  });*/
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
