const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { registerDoctor, loginDoctor } = require("./controller/doctor");
const {
  registerCompounder,
  loginCompounder,
  registerPatientByCompounder,
  getLatestPatientByID,
  listOfPatients,
  updatePatient,
} = require("./controller/compounder");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

//////////////connection to database////////////////////
mongoose.connect(
  "mongodb+srv://ajayamunik:Nfed6RWJWGDd2fMN@cluster0.51duirc.mongodb.net/doctor_house",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

/////////////routes//////////////////////

// doctor registration
app.post("/register-doctor", registerDoctor);

//  doctor login
app.post("/login-doctor", loginDoctor);

// compounder registration
app.post("/register-compounder", registerCompounder);

// compounder login
app.post("/login-compounder", loginCompounder);

//  compounder registration of patient
app.post("/register-patient-by-compounder", registerPatientByCompounder);

//get the latest patient details
app.get("/patients-list", listOfPatients);

// get the latest patient details by Aadhar card number
app.get("/get-patient/:patientId", getLatestPatientByID);

// update patient details
app.put("/update-patient/:patientId", updatePatient);

//////////////server/////////////////////
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
