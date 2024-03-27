import express from "express";
import * as illnessControlller from "../controllers/IllnessControlller";

const illnessRoutes = express.Router();

illnessRoutes.get("/getIllnessOfPatient/:patientId", illnessControlller.getIllnessOfPatient);
illnessRoutes.get("/getAllIllnesses", illnessControlller.getAllIllnesses);
illnessRoutes.post("/addIllness", illnessControlller.addIllness);
illnessRoutes.put("/updateIllness/:illnessId", illnessControlller.updateIllness);
illnessRoutes.delete("/deleteIllness/:illnessId", illnessControlller.deleteIllness);

export default illnessRoutes;