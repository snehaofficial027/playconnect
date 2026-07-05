import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/notifications`;
export const getNotifications =
()=>{

const token =
localStorage.getItem("token");

return axios.get(
API,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

};