import express from "express";
import * as patientController from "../controllers/PatientController";

const patientRoutes = express.Router();

patientRoutes.get("/getPatient/:patientId", patientController.getPatient);
patientRoutes.get("/getAllPatients", patientController.getAllPatients);
patientRoutes.post("/addPatient", patientController.addPatient);
patientRoutes.put("/updatePatient/:patientId", patientController.updatePatient);
patientRoutes.delete("/deletePatient/:patientId", patientController.deletePatient);

export default patientRoutes;
