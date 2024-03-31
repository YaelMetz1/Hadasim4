import { Request, Response } from "express";
import * as patientServices from "../services/PatientServices"

export async function getPatient(req: Request, res: Response) {
  try {
    const patient = await patientServices.getPatient(+(req.params.patientId));
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ Message: "Error getting patient" });
  }
}

export async function getAllPatients(req: Request, res: Response) {
  try {
    const patients = await patientServices.getAllPatients();

    const modifiedPatients = patients.map(patient => {
      const { birthDate, ...rest } = patient;
      const dateWithoutTime = new Date(birthDate).toISOString().split('T')[0];
      return {
        ...rest,
        birthDate: dateWithoutTime
      };
    });

    res.status(200).json(modifiedPatients);
  } catch (error) {
    res.status(400).json({ Message: "Error getting patients" });
  }
}

export async function addPatient(req: Request, res: Response) {
  try {
    const { birthDate, ...rest } = req.body;
    const formattedDate = new Date(birthDate as Date);
    formattedDate.setUTCHours(0, 0, 0, 0);
    const formatedPatient = {
      ...rest,
      birthDate: formattedDate,
      picture: req.body.picture || null,
    };
    const patient = await patientServices.addPatient(formatedPatient);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export async function updatePatient(req: Request, res: Response) {
  try {
    const { birthDate, ...rest } = req.body;
    const formattedDate = new Date(birthDate as Date);
    formattedDate.setUTCHours(0, 0, 0, 0);
    const formatedPatient = {
      ...rest,
      birthDate: formattedDate,
      picture: req.body.picture || null,
    };
    const updatedPatient = await patientServices.updatePatient(+(req.params.patientId), formatedPatient);
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ Message: "Error updating patient" });
  }
}

export async function deletePatient(req: Request, res: Response) {
  try {
    const deletedPatient = await patientServices.deletePatient(+(req.params.patientId));
    res.status(200).json(deletedPatient);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
