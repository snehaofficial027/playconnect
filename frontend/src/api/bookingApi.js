import axios from "axios";
import { API_URL } from "../config";

const API = `${API_URL}/api/bookings`;

const token = () => localStorage.getItem("token");

// Create Booking
export const createBooking = (data) => {
  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
};

// My Bookings
export const getMyBookings = () => {
  return axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
};

// All Bookings (Admin)
export const getAllBookings = () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
};

// Update Status (Admin)
export const updateBookingStatus = (id, status) => {
  return axios.put(
    `${API}/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
};

// Cancel Booking
export const cancelBooking = (id) => {
  return axios.put(
   `${API}/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
};

// ===============================
// GET BOOKED SLOTS
// ===============================

export const getBookedSlots = (venueId, date) => {

  return axios.get(
    `${API}/slots/${venueId}/${date}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

};