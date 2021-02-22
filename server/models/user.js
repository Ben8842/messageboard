const mongoose = require("../db/db");
const schema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);
const user = new schema(
  {
    message: [String]
    movieNames: [String],
    methods: [String],
    name: String,
    storeTimestamps: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
