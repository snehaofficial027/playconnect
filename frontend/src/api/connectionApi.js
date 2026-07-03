import axios from "axios";

const API =
"http://localhost:5000/api/connection";

const getToken = () =>
localStorage.getItem("token");

export const sendRequest = (receiverId) => {

  const token = localStorage.getItem("token");

  return axios.post(
    "http://localhost:5000/api/connection/send",
    { receiverId },
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

};

export const getRequests =
() => {

return axios.get(
`${API}/requests`,
{
headers:{
Authorization:
`Bearer ${getToken()}`
}
}
);

};

export const getSentRequests =
() => {

return axios.get(
`${API}/sent`,
{
headers:{
Authorization:
`Bearer ${getToken()}`
}
}
);

};

export const acceptRequest =
(id) => {

return axios.put(
`${API}/accept/${id}`,
{},
{
headers:{
Authorization:
`Bearer ${getToken()}`
}
}
);

};

export const getConnections =
() => {

return axios.get(
`${API}/connections`,
{
headers:{
Authorization:
`Bearer ${getToken()}`
}
}
);

};