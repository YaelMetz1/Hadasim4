import { Request, Response } from "express";
import * as illnessServices from "../services/IllnessServices"

export async function getIllnessOfPatient(req: Request, res: Response) {
  try {
    const illness = await illnessServices.getIllnessOfPatient(+(req.params.patientId));

    if (illness?.illnessDate && illness.recoveryDate) {
      const { illnessDate, recoveryDate, ...rest } = illness;
      const illnessDateWithoutTime = new Date(illnessDate).toISOString().split('T')[0];
      const recoveryDateWithoutTime = new Date(recoveryDate).toISOString().split('T')[0];
      const formatedIllness = {
        ...rest,
        illnessDate: illnessDateWithoutTime,
        recoveryDate: recoveryDateWithoutTime
      };
      res.status(200).json(formatedIllness);
    } else {
      res.status(200).json(illness);
    }
  } catch (error) {
    res.status(400).json({error: error});
  }
}

export async function getAllIllnesses(req: Request, res: Response) {
  try {
    const illnesses = await illnessServices.getAllIllnesses();

    const modifiedIllnesses = illnesses.map(illness => {
      const { illnessDate, recoveryDate, ...rest } = illness;
      const illnessDateWithoutTime = new Date(illnessDate).toISOString().split('T')[0];
      const recoveryDateWithoutTime = new Date(recoveryDate).toISOString().split('T')[0];
      return {
        ...rest,
        illnessDate: illnessDateWithoutTime,
        recoveryDate: recoveryDateWithoutTime,
      };
    });
    res.status(200).json(modifiedIllnesses);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export async function addIllness(req: Request, res: Response) {
  try {
    const { illnessDate, recoveryDate, ...rest } = req.body;
    const formattedIllnessDate = new Date(illnessDate as Date);
    formattedIllnessDate.setUTCHours(0, 0, 0, 0);
    const formattedRecoveryDate = new Date(recoveryDate as Date);
    formattedRecoveryDate.setUTCHours(0, 0, 0, 0);
    const formatedPatient = {
      ...rest,
      illnessDate: formattedIllnessDate,
      recoveryDate: formattedRecoveryDate,
    };
    const illness = await illnessServices.addIllness(formatedPatient);
    res.status(200).json(illness);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export async function updateIllness(req: Request, res: Response) {
  try {
    const { illnessDate, recoveryDate, ...rest } = req.body;
    const formattedIllnessDate = new Date(illnessDate as Date);
    formattedIllnessDate.setUTCHours(0, 0, 0, 0);
    const formattedRecoveryDate = new Date(recoveryDate as Date);
    formattedRecoveryDate.setUTCHours(0, 0, 0, 0);
    const formatedPatient = {
      ...rest,
      illnessDate: formattedIllnessDate,
      recoveryDate: formattedRecoveryDate,
    };
    const updatedPatient = await illnessServices.updateIllness(+(req.params.illnessId), formatedPatient);
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export async function deleteIllness(req: Request, res: Response) {
  try {
    const deletedIllness = await illnessServices.deleteIllness(+(req.params.illnessId));
    res.status(200).json(deletedIllness);
  } catch (error) {
    res.status(400).json(({ error: error }));
  }
}

export async function getAllIlnessesLastMonth(req: Request, res: Response) {
  try {
    const illnesses = await illnessServices.getAllIlnessesLastMonth();

    const modifiedIllnesses = illnesses.map(illness => {
      const { illnessDate, recoveryDate, ...rest } = illness;
      const illnessDateWithoutTime = new Date(illnessDate).toISOString().split('T')[0];
      const recoveryDateWithoutTime = new Date(recoveryDate).toISOString().split('T')[0];
      return {
        ...rest,
        illnessDate: illnessDateWithoutTime,
        recoveryDate: recoveryDateWithoutTime,
      };
    });
    res.status(200).json(modifiedIllnesses);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}