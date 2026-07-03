import axios from "axios";

const API = "http://localhost:5000/api/payment";

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