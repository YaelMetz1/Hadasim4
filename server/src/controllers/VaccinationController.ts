import { Request, Response } from "express";
import * as vaccinationServices from "../services/VaccinationServices"
import Vaccination from "../types/Vaccination"

export async function getVaccinationsOfPatient(req: Request, res: Response) {
  try {
    const vaccinations = await vaccinationServices.getVaccinationsOfPatient(+(req.params.patientId));

    const modifiedVaccinations = vaccinations.map(vaccination => {
      const { vaccinationDate, ...rest } = vaccination;
      const dateWithoutTime = new Date(vaccinationDate).toISOString().split('T')[0];
      return {
        ...rest,
        vaccinationDate: dateWithoutTime 
      };
    });

    res.status(200).json(modifiedVaccinations);
  } catch (error) {
    res.status(400).json({ Message: "Error getting vaccinations" });
  }
}

export async function getAllVaccinations(req: Request, res: Response) {
  try {
    const vaccinations = await vaccinationServices.getAllVaccinations();
    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(400).json({ Message: "Error getting vaccinations" });
  }
}

export async function addVaccination(req: Request, res: Response) {
  try {
    const vaccination = await vaccinationServices.addVaccination(req.body);
    res.status(200).json(vaccination);
  } catch (error) {
    res.status(400).json({ Message: "Error inserting vaccination"});
  }
}

export async function updateVaccination(req: Request, res: Response) {
  try {
    const updatedVaccination = await vaccinationServices.updateVaccination(+(req.params.vaccinationId), req.body);
    res.status(200).json(updatedVaccination);
  } catch (error) {
    res.status(400).json({ Message: "Error updating vaccination" });
  }
}

export async function deleteVaccination(req: Request, res: Response) {
  try {
    const deletedVaccination = await vaccinationServices.deleteVaccination(+(req.params.vaccinationId));
    res.status(200).json(deletedVaccination);
  } catch (error) {
    res.status(400).json(({ error: error }));
  }
}
