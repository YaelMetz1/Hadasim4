import express from "express";
import * as vaccinationController from "../controllers/VaccinationController";

const vaccinationRoutes = express.Router();

vaccinationRoutes.get("/getVaccinationsOfPatient/:patientId", vaccinationController.getVaccinationsOfPatient);
vaccinationRoutes.get("/getAllVaccinations", vaccinationController.getAllVaccinations);
vaccinationRoutes.post("/addVaccination", vaccinationController.addVaccination);
vaccinationRoutes.put("/updateVaccination/:vaccinationId", vaccinationController.updateVaccination);
vaccinationRoutes.delete("/deleteVaccination/:vaccinationId", vaccinationController.deleteVaccination);

export default vaccinationRoutes;
