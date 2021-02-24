const mongoose = require("../db/db");
const schema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);
const userprofile = new schema(
  {
    email: String,
    password: String,
    vote: 0,
  },
  { timestamps: true }
);

module.exports = mongoose.model("userprofile", userprofile);
