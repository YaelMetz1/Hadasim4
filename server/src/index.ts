import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import illnessRoutes from "../src/routes/IllnessRoutes";
import patientRoutes from "../src/routes/PatientRoutes";
import vaccinationRoutes from "../src/routes/VaccinationRoutes";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/illness", illnessRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/vaccination", vaccinationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});