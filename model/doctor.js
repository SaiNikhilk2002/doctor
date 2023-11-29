const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
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
    // add specilization
    specialization: {
      type: String,
    },
  },
  {
    timestamps: true, // Add timestamps option
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
