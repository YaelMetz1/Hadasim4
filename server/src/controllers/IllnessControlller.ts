import { Request, Response } from "express";
import * as illnessServices from "../services/IllnessServices"

export async function getIllnessOfPatient(req: Request, res: Response) {
  try {
    const illness = await illnessServices.getIllnessOfPatient(+(req.params.patientId));

    if(illness?.illnessDate && illness.recoveryDate){
    const { illnessDate, recoveryDate, ...rest } = illness;
    const illnessDateWithoutTime = new Date(illnessDate).toISOString().split('T')[0];
    const recoveryDateWithoutTime = new Date(recoveryDate).toISOString().split('T')[0];
    const formatedIllness= {
      ...rest,
      illnessDate: illnessDateWithoutTime, 
      recoveryDate: recoveryDateWithoutTime
    };
    res.status(200).json(formatedIllness);
    }else{
    res.status(200).json(illness);
    }
  } catch (error) {
    res.status(400).json({ Message: "Error getting illness" });
  }
}

export async function getAllIllnesses(req: Request, res: Response) {
  try {
    const illnesses = await illnessServices.getAllIllnesses();
    res.status(200).json(illnesses);
  } catch (error) {
    res.status(400).json({ Message: "Error getting illnesses" });
  }
}

export async function addIllness(req: Request, res: Response) {
  try {
    console.log(req.body);
    const illness = await illnessServices.addIllness(req.body);
    res.status(200).json(illness);
  } catch (error) {
    console.log(error);
    res.status(400).json({ Message: "Error inserting illness"});
  }
}

export async function updateIllness(req: Request, res: Response) {
  try {
    const updatedPatient = await illnessServices.updateIllness(+(req.params.patientId), req.body);
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ Message: "Error updating illness" });
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
