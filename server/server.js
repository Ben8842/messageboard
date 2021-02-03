const express = require("express");
const path = require("path");

const { getMaxListeners } = require("./models/user");
const user = require("./models/user");
//const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());

//example
app.post("/users", (req, res) => {
  console.log("posting");
  console.log(req.body.email);
  const body = req.body;
  const userObject = new user(body);
  user.findOne(
    {
      email: req.body.email,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error during finding");
      } else if (data == null) {
        console.log("null!" + data);
        userObject.save(function (error) {
          console.log("done.");
          console.log(error);
          if (error) {
            console.log("issues here:" + error);
            return res.status(500).send("Server Error while saving");
          } else {
            return res.status(201).send("user saved");
          }
          return;
        });

        //res.json(data);
      } else if (data != null) {
        console.log("not null!" + data);
        console.log("duplicate !! (email)");
        return res.status(400).send("duplicate email record");
      }
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
