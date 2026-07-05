import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/auth`;

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