import axios from "axios";
import Patient from "../types/Patient";

const API_URL = "http://localhost:4000/api/patient";

export async function getAllPatients() {
  try {
    const response = await axios.get(API_URL + "/getAllPatients");
    if (response) {
      return response.data as Patient[];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function addPatient(pateint: Partial<Patient>): Promise<Patient | undefined> {
  try {
    console.log(pateint);
    const response = await axios.post(API_URL + "/addPatient", pateint);
    if (response) {
      return response.data as Patient;
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function updatePatient(patient: Partial<Patient>) : Promise<Patient|undefined>{
  try {
    const response = await axios.put(API_URL + `/updatePatient/${patient.patientId}`, patient);
    if (response) {
      return response.data as Patient;
    }
  } catch (error) {
    console.error("Error update patient:", error);
  }
}

export async function deletePatient(patientId: number) {
  try {
    await axios.delete(API_URL + `/deletePatient/${patientId}`);
  } catch (error) {
    console.error("Error deleting patient:", error);
  }
}