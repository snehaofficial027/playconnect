import axios from "axios";
import { API_URL } from "../config";

// Base API (backend URL)
const API = `${API_URL}/api/auth`;

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