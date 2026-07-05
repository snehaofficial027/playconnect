import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/ai`;

export const getAISuggestion = (data) => {

  const token = localStorage.getItem("token");

  return axios.post(
    `${API}/suggestion`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};