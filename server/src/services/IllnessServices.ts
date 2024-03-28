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
  const formattedIllnessDate = new Date(illnessData.illnessDate as Date);
  formattedIllnessDate.setUTCHours(0, 0, 0, 0);

  const formattedRecoveryDate = new Date(illnessData.recoveryDate as Date);
  formattedRecoveryDate.setUTCHours(0, 0, 0, 0);

  const illness = await prisma.illness.create({
    data: {
      patientId: illnessData.patientId as number,
      illnessDate: formattedIllnessDate,
      recoveryDate: formattedRecoveryDate,
    },
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
