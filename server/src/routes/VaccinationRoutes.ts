import express from "express";
import * as vaccinationController from "../controllers/VaccinationController";
import { validate, dataSchema } from "../middleware/AddVaccinMiddleware";

const vaccinationRoutes = express.Router();

vaccinationRoutes.get("/getVaccinationsOfPatient/:patientId", vaccinationController.getVaccinationsOfPatient);
vaccinationRoutes.get("/getAllVaccinations", vaccinationController.getAllVaccinations);
vaccinationRoutes.get("/getAllVaccinatedPatients", vaccinationController.getAllVaccinatedPatients);

vaccinationRoutes.post("/addVaccination", validate(dataSchema), vaccinationController.addVaccination);
vaccinationRoutes.put("/updateVaccination/:vaccinationId", vaccinationController.updateVaccination);
vaccinationRoutes.delete("/deleteVaccination/:vaccinationId", vaccinationController.deleteVaccination);

export default vaccinationRoutes;
