import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/message`;

const getToken = () =>
localStorage.getItem("token");

export const sendMessage = (
receiverId,
text
) => {

return axios.post(
`${API}/send`,
{
receiverId,
text,
},
{
headers: {
Authorization:
`Bearer ${getToken()}`,
},
}
);
};

export const getMessages = (
userId
) => {

return axios.get(
`${API}/${userId}`,
{
headers: {
Authorization:
`Bearer ${getToken()}`,
},
}
);
};