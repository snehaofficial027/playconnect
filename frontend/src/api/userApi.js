import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/user`;

/*
========================
UPDATE PROFILE
========================
*/

export const updateProfile = (
  profileData
) => {

  const token =
    localStorage.getItem("token");

  return axios.put(
    `${API}/profile`,
    profileData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

/*
========================
GET ALL PLAYERS
========================
*/

export const getPlayers = () => {

  const token = localStorage.getItem("token");

  if (token) {
    return axios.get(`${API}/players`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Guest user
  return axios.get(`${API}/players`);

};
/*
========================
GET MY PROFILE
========================
*/

export const getProfile =
  () => {

    const token =
      localStorage.getItem("token");

    return axios.get(
      `${API}/profile`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  };

/*
========================
GET PLAYER BY ID
========================
*/

export const getPlayerById =
  (id) => {

    const token =
      localStorage.getItem("token");

    return axios.get(
      `${API}/player/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  };

  /*
========================
ADMIN - GET USERS
========================
*/

export const getUsers = () => {

  const token = localStorage.getItem("token");

  return axios.get(`${API}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

/*
========================
ADMIN - DELETE USER
========================
*/

export const deleteUser = (id) => {

  const token = localStorage.getItem("token");

  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

/*
========================
ADMIN - CHANGE ROLE
========================
*/

export const changeRole = (id, role) => {

  const token = localStorage.getItem("token");

  return axios.put(
    `${API}/${id}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};