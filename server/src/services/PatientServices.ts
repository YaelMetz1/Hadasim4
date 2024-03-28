import prisma from "../db/Client"
import Patient from "../types/Patient";

export async function getPatient(patientId: number) {
  const patient = await prisma.patient.findFirst({
    where: {
      patientId: patientId,
    }
  });
  return patient;
}

export async function getAllPatients() {
  const patients = await prisma.patient.findMany({
    orderBy: {
      patientId: "asc",
    },
  });
  return patients;
}

export async function addPatient(patientData: Partial<Patient>) {

  const patient = await prisma.patient.create({
    data: patientData as Patient,
  });
  return patient;
}

export async function updatePatient(patientId: number, patientData: Partial<Patient>) {
  
  const updatedPatient = await prisma.patient.update({
    where: {
      patientId: patientId,
    },
    data: patientData,
  });
  return updatedPatient;
}

export async function deletePatient(patientId: number) {
  const deletePatient = await prisma.patient.delete({
    where: {
      patientId: patientId,
    },
  });
  return deletePatient;
}
