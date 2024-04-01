import { Request, Response } from "express";
import * as vaccinationServices from "../services/VaccinationServices"

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
    res.status(400).json({ error: error });
  }
}

export async function getAllVaccinations(req: Request, res: Response) {
  try {
    const vaccinations = await vaccinationServices.getAllVaccinations();

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
    res.status(400).json({ error: error });
  }
}

export async function addVaccination(req: Request, res: Response) {
  try {
    const { vaccinationDate, ...rest } = req.body;
    const formattedDate = new Date(vaccinationDate as Date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const formatedVaccination = {
      ...rest,
      recoveryDate: formattedDate,
    };
    const vaccination = await vaccinationServices.addVaccination(formatedVaccination);
    res.status(200).json(vaccination);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export async function updateVaccination(req: Request, res: Response) {
  try {
    const { vaccinationDate, ...rest } = req.body;
    const formattedDate = new Date(vaccinationDate as Date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const formatedVaccination = {
      ...rest,
      recoveryDate: formattedDate,
    };
    const updatedVaccination = await vaccinationServices.updateVaccination(+(req.params.vaccinationId), formatedVaccination);
    res.status(200).json(updatedVaccination);
  } catch (error) {
    res.status(400).json({ error: error });
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

//returns all id-s of patients who did vaccinations.
export async function getAllVaccinatedPatients(req: Request, res: Response) {
  try {
    const patients = await vaccinationServices.getAllVaccinatedPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}