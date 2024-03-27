import prisma from "../db/Client"
import Patient from "../types/Patient";

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
    data: {
      firstName: patientData.firstName as string,
      lastName: patientData.lastName as string,
      id: patientData.id as string,
      city: patientData.city as string,
      street: patientData.street as string,
      streetNumber: patientData.streetNumber as number,
      birthDate: patientData.birthDate as Date,
      phoneNumber: patientData.phoneNumber as string,
      mobilePhoneNumber: patientData.mobilePhoneNumber as string,
    },
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
