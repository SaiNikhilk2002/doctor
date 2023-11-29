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
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

//////////////connection to database////////////////////
uri= "mongodb+srv://ajayamunik:Nfed6RWJWGDd2fMN@cluster0.51duirc.mongodb.net/doctor_house"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
