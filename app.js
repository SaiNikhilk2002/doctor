const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const { registerDoctor, loginDoctor } = require("./controller/doctor");
const {
  registerCompounder,
  loginCompounder,
  registerPatientByCompounder,
  getLatestPatientByAdharCard,
  listOfPatients,
} = require("./controller/compounder");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

//////////////connection to database////////////////////
// mongoose.connect("mongodb://localhost:27017/doctor_house", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const uri = 'mongodb+srv://username:password@cluster0.51duirc.mongodb.net/yourdatabase?retryWrites=true&w=majority';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


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
app.get("/get-patient/:adharCardNo", getLatestPatientByAdharCard);

//////////////server/////////////////////
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
