import prisma from "../db/Client"
import Vaccination from "../types/Vaccination";

export async function getVaccinationsOfPatient(patientId: number) {
  const vaccinations = await prisma.vaccination.findMany({
    where: {
      patientId: patientId,
    }
  });
  return vaccinations;
}

export async function getAllVaccinations() {
  const vaccinations = await prisma.vaccination.findMany({
    orderBy: {
      patientId: "asc",
    },
  });
  return vaccinations;
}

export async function addVaccination(vaccinationData: Partial<Vaccination>) {

  const vaccination = await prisma.vaccination.create({
    data: vaccinationData as Vaccination
  });
  return vaccination;
}

export async function updateVaccination(vaccinationId: number, vaccinationData: Partial<Vaccination>) {
  const updatedVaccination = await prisma.vaccination.update({
    where: {
      vaccinationId: vaccinationId,
    },
    data: vaccinationData,
  });
  return updatedVaccination;
}

export async function deleteVaccination(vaccinationId: number) {
  const deletedVaccination = await prisma.vaccination.delete({
    where: {
      vaccinationId: vaccinationId,
    },
  });
  return deletedVaccination;
}

export async function getAllVaccinatedPatients() {
  const patients = await prisma.vaccination.groupBy({
    by: ['patientId'],
  });
  return patients;
}