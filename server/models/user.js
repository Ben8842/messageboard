const mongoose = require("../db/db");
const schema = mongoose.Schema;
const user = new schema({
  movieNames: [String],
  methods: [String],
});

module.exports = mongoose.model("user", user);
