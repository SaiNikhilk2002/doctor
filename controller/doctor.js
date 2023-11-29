const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/doctor");

const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Check if the email is already registered
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new doctor
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
    });
    await doctor.save();

    res.json({
      message: `Doctor registered successfully!`,
      responseCoed: 200,
      data: {
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(200).json({
        message: "Invalid credentials",
        responseCode: 400,
        data: null,
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, doctor.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(200).json({
        message: "Invalid password or email",
        responseCode: 400,
        data: null,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email },
      "your-secret-key"
    );

    res.status(200).json({
      message: "login successfull",
      responseCode: 200,
      data: { token: token, name: doctor.name, email: doctor.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerDoctor, loginDoctor };
