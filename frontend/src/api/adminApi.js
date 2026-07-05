import axios from "axios";
import { API_URL } from "../config"; 

const API = `${API_URL}/api/auth`;

export const getDashboard = () => {

const token =
localStorage.getItem("token");

return axios.get(
`${API}/dashboard`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

};