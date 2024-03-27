import { Request, Response } from "express";
import * as patientServices from "../services/PatientServices"

export async function getAllPatients(req: Request, res: Response) {
  try {
    const patients = await patientServices.getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ Message: "Error getting patients" });
  }
}

export async function addPatient(req: Request, res: Response) {
  try {
    const patient = await patientServices.addPatient(req.body);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ Message: "Error inserting patient"});
  }
}

export async function updatePatient(req: Request, res: Response) {
  try {
    const updatedPatient = await patientServices.updatePatient(+(req.params.patientId), req.body);
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ Message: "Error updating patient", Error: error });
  }
}

export async function deletePatient(req: Request, res: Response) {
  try {
    const deletedPatient = await patientServices.deletePatient(+(req.params.patientId));
    res.status(200).json(deletedPatient);
  } catch (error) {
    res.status(400).json({ Message: "Error deleting patient" });
  }
}
