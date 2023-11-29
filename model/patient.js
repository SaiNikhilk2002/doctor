const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    adharCardNo: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    currentBloodPressure: {
      type: String,
      required: true,
    },
    currentSugar: {
      type: String,
      required: true,
    },
    currentHealthIssues: {
      type: String,
      required: true,
    },
    previousMedicalHistory: {
      type: [String],
    },
    medicinesUsed: {
      type: [String],
    },
    averageBP: {
      type: String,
    },
    averageSugar: {
      type: String,
    },
    previousSurgeries: {
      type: [String],
    },

    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    appointmentStatus: {
      type: Boolean,
      default: false,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps option
  }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
