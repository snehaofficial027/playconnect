import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/tournament`;

const getToken = () => localStorage.getItem("token");

// Create Tournament
export const createTournament = (data) => {
  return axios.post(
    `${API}/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// Get All Tournaments
export const getTournaments = () => {
  return axios.get(`${API}/all`);
};

// My Tournaments
export const getMyTournaments = () => {
  return axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Join Tournament
export const joinTournament = (id) => {
  return axios.put(
    `${API}/join/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// Get Tournament Details
export const getTournament = (id) => {
  return axios.get(`${API}/${id}`);
};

// Admin - Get All Tournaments
export const getAllTournaments = () => {
  return axios.get(`${API_URL}/api/admin/tournaments`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Admin - Delete Tournament
export const deleteTournament = (id) => {
  return axios.delete(`${API_URL}/api/admin/tournaments/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};