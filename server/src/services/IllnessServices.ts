import prisma from "../db/Client"
import Illness from "../types/Illness";

export async function getIllnessOfPatient(patientId: number) {
  const illness = await prisma.illness.findFirst({
    where: {
      patientId: patientId,
    }
  });
  return illness;
}

export async function getAllIllnesses() {
  const illnesses = await prisma.illness.findMany({
    orderBy: {
      patientId: "asc",
    },
  });
  return illnesses;
}

export async function addIllness(illnessData: Partial<Illness>) {
  const illness = await prisma.illness.create({
    data: illnessData as Illness,
  });
  return illness;
}

export async function updateIllness(illnessId: number, illnessData: Partial<Illness>) {
  const updatedIllness = await prisma.illness.update({
    where: {
      illnessId: illnessId,
    },
    data: illnessData,
  });
  return updatedIllness;
}

export async function deleteIllness(illnessId: number) {
  const deletedIllness = await prisma.illness.delete({
    where: {
      illnessId: illnessId,
    },
  });
  return deletedIllness;
}

export async function getAllIlnessesLastMonth() {
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  const illnesses = await prisma.illness.findMany({
    where: {
      OR: [{
        illnessDate: {
          lte: lastDay,
          gte: firstDay,
        }},
      {
        recoveryDate:{
          lte: lastDay,
          gte: firstDay,
        }},
      ]
    },
  });
  return illnesses;
}