const mongoose = require("../db/db");
const schema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);
const message = new schema(
  {
    text: String,
    emailtext: String,
    positiveVote: [String],
    negativeVote: [String],
    vote: {
      value: Number,
      get: (a) => {
        let votenumber = this.positiveVote.length - this.negativeVote.length;
        return votenumber;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", message);
