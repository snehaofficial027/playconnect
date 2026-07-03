import axios from "axios";

const API =
"http://localhost:5000/api/message";

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