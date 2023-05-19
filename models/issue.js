const mongoose = require("mongoose");

const Issues = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobilenumber: { type: Number, required: true },
    email: { type: String, required: true },
    des: { type: String, required: true },
  },
  { collection: "issues" }
);

const model = mongoose.model("IssuesData", Issues);

module.exports = model;