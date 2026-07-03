import axios from "axios";

const API = "http://localhost:5000/api/ai";

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