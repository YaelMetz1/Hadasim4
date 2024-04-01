import express from "express";
import * as illnessControlller from "../controllers/IllnessControlller";
import { validate, dataSchema} from "../middleware/AddIllnessMiddleware";

const illnessRoutes = express.Router();

illnessRoutes.get("/getIllnessOfPatient/:patientId", illnessControlller.getIllnessOfPatient);
illnessRoutes.get("/getAllIllnesses", illnessControlller.getAllIllnesses);
illnessRoutes.get("/getAllIlnessesLastMonth", illnessControlller.getAllIlnessesLastMonth);

illnessRoutes.post("/addIllness",validate(dataSchema),  illnessControlller.addIllness);
illnessRoutes.put("/updateIllness/:illnessId", illnessControlller.updateIllness);
illnessRoutes.delete("/deleteIllness/:illnessId", illnessControlller.deleteIllness);

export default illnessRoutes;
