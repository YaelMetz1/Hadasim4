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
  const formattedDate = new Date(vaccinationData.vaccinationDate as Date);
  formattedDate.setUTCHours(0, 0, 0, 0);
  const vaccination = await prisma.vaccination.create({
    data: {
      patientId: vaccinationData.patientId as number,
      vaccinationDate: formattedDate,
      vaccinationProducer: vaccinationData.vaccinationProducer as string,
    },
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
