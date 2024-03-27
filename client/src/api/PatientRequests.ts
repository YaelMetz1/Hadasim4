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