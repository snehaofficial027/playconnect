import axios from "axios";

const API = "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

/* ===========================
   USER
=========================== */

// Create Tournament
export const createTournament = (data) => {
  return axios.post(
    `${API}/tournaments`,
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
  return axios.get(
    `${API}/tournaments`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// My Tournaments
export const getMyTournaments = () => {
  return axios.get(
    `${API}/tournaments/my`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// Join Tournament
export const joinTournament = (id) => {
  return axios.post(
    `${API}/tournaments/${id}/join`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/* ===========================
   ADMIN
=========================== */

// Get All Tournaments (Admin)
export const getAllTournaments = () => {
  return axios.get(
    `${API}/admin/tournaments`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// Delete Tournament
export const deleteTournament = (id) => {
  return axios.delete(
    `${API}/admin/tournaments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};