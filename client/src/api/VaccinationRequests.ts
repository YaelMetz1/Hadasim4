import axios from "axios";
import Vaccination from "../types/Vaccination";

const API_URL = "http://localhost:4000/api/vaccination";

export async function getVaccinationsOfPatient(patientId: number) {
  try {
    const response = await axios.get(API_URL + `/getVaccinationsOfPatient/${patientId}`);
    if (response) {
      return response.data as Vaccination[];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function addVaccination(vaccination: Partial<Vaccination>): Promise<Vaccination | undefined> {
  try {
    const response = await axios.post(API_URL + "/addVaccination", vaccination);
    if (response) {
      return response.data as Vaccination;
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function getAllVaccinatedPatients() {
  try {
    const response = await axios.get(API_URL + `/getAllVaccinatedPatients`);
    if (response) {
      return response.data as { patientId: number }[];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}