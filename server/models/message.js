const mongoose = require("../db/db");
const schema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);
const message = new schema(
  {
    text: String,
    vote: 0,
    emailtext: String,
    positiveVote: [String],
    negativeVote: [String],
    topic: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", message);
