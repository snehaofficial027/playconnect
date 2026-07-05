import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/payment`;

export const createOrder = (amount) => {

  const token = localStorage.getItem("token");

  return axios.post(
    `${API}/create-order`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};