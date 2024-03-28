import axios from "axios";
import Illness from "../types/Illness";

const API_URL = "http://localhost:4000/api/illness";

export async function getIllnessOfPatient(patientId: number) {
  try {
    const response = await axios.get(API_URL + `/getIllnessOfPatient/${patientId}`);
    if (response) {
      return response.data as Illness;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function addIllness(illness: Partial<Illness>): Promise<Illness | undefined> {
  try {
    console.log(illness);
    const response = await axios.post(API_URL + "/addIllness", illness);
    if (response) {
      return response.data as Illness;
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}