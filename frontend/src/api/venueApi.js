import axios from "axios";

// Base API (backend URL)
const API = axios.create({
  baseURL: "http://localhost:5000/api/venues",
});

// Add Venue
export const addVenue = (data) =>
  API.post("/", data, {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  });

// Get All Venues
export const getAllVenues = () =>
  API.get("/");

// Get Single Venue
export const getVenue = (id) =>
  API.get(`/${id}`);

// Update Venue
export const updateVenue = (id, data) =>
  API.put(`/${id}`, data);

// Delete Venue
export const deleteVenue = (id) =>
  API.delete(`/${id}`);

// Search Venue
export const searchVenue = (params) =>
  API.get("/search", { params });