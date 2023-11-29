const mongoose = require("mongoose");

const compounderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps option
  }
);

const Compounder = mongoose.model("Compounder", compounderSchema);

module.exports = Compounder;
