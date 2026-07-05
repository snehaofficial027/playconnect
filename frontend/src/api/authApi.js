import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/auth`;

export const registerUser = (data) => {
  return axios.post(
    `${API}/register`,
    data
  );
};

export const loginUser = (data) => {
  return axios.post(
    `${API}/login`,
    data
  );
};