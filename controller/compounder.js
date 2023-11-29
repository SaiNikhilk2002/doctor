const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Compounder = require("../model/compounder");
const Patient = require("../model/patient");

const registerCompounder = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingCompounder = await Compounder.findOne({ email });
    if (existingCompounder) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new compounder
    const compounder = new Compounder({
      name,
      email,
      password: hashedPassword,
    });
    await compounder.save();

    res.json({
      message: "Compounder registered successfully!",
      responseCoed: 200,
      data: { name: compounder.name, email: compounder.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginCompounder = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the compounder exists
    const compounder = await Compounder.findOne({ email });
    if (!compounder) {
      return res.status(200).json({
        message: "Invalid credentials",
        responseCode: 400,
        data: null,
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, compounder.password);
    if (!passwordMatch) {
      return res.status(200).json({
        message: "Invalid password or email",
        responseCode: 400,
        data: null,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: compounder._id, email: compounder.email },
      "your-secret-key",
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    res.status(200).json({
      message: "login successfull",
      responseCode: 200,
      data: { token: token, name: compounder.name, email: compounder.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerPatientByCompounder = async (req, res) => {
  try {
    const {
      name,
      phone,
      adharCardNo,
      age,
      currentBloodPressure,
      currentSugar,
      currentHealthIssues,
      previousMedicalHistory,
      medicinesUsed,
      averageBP,
      averageSugar,
      previousSurgeries,
      height,
      weight,
      doctorId, // Make sure compounder specifies the doctorId
    } = req.body;

    // Create a new patient
    const patient = new Patient({
      name,
      phone,
      adharCardNo,
      age,
      currentBloodPressure,
      currentSugar,
      currentHealthIssues,
      previousMedicalHistory,
      medicinesUsed,
      averageBP,
      averageSugar,
      height,
      weight,
      previousSurgeries,
      doctorId,
    });

    await patient.save();

    res.status(200).json({
      message: "Patient registered successfully!",
      responseCode: 200,
      data: {
        patientId: patient._id,
        name: patient.name,
        phone: patient.phone,
        adharCardNo: patient.adharCardNo,
        age: patient.age,
        doctorId: patient.doctorId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLatestPatientByID = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find the latest patient with the specified Aadhar card number
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res
        .status(200)
        .json({ message: "Patient not found", responseCode: 400, data: null });
    }

    res.json({ data: patient, responseCode: 200, message: "Patient found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listOfPatients = async (req, res) => {
  try {
    // Find all patients with appointmentStatus equal to false and sort by the createdAt field in descending order
    const patients = await Patient.find({ appointmentStatus: false }).sort({
      createdAt: -1,
    });

    if (!patients || patients.length === 0) {
      return res.status(200).json({
        message: "No patients found",
        responseCode: 400,
        data: [],
      });
    }

    res.json({
      data: patients,
      responseCode: 200,
      message: "Patients found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find by and update patient by id
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { appointmentStatus: true },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(200).json({
        message: "Patient not found",
        responseCode: 404,
        data: null,
      });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      responseCode: 200,
      data: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerCompounder,
  loginCompounder,
  registerPatientByCompounder,
  getLatestPatientByID,
  listOfPatients,
  updatePatient,
};
