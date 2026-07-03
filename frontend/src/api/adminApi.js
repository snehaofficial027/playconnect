import axios from "axios";

const API =
"http://localhost:5000/api/admin";

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