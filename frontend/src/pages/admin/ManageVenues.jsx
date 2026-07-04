import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import {
  getAllVenues,
  deleteVenue,
} from "../../api/venueApi";

const ManageVenues = () => {

  const [venues, setVenues] =
    useState([]);

  const loadVenues = async () => {

    try {

      const res =
        await getAllVenues();

      setVenues(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadVenues();

  }, []);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this venue?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteVenue(id);

        alert(
          "✅ Venue Deleted Successfully"
        );

        loadVenues();

      } catch (err) {

        console.log(err);

        alert(
          "❌ Failed to Delete Venue"
        );

      }

    };

  return (

    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* Heading */}

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold">

              🏟 Manage Venues

            </h1>

            <p className="text-gray-500 mt-2">

              Total Venues :
              <span className="font-bold text-blue-600 ml-2">

                {venues.length}

              </span>

            </p>

          </div>

          <Link
            to="/admin/add-venue"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold text-center"
          >
            ➕ Add Venue
          </Link>

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">

          <table className="min-w-full whitespace-nowrap">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Sport
                </th>

                <th className="p-4 text-left">
                  City
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {venues.map((venue) => (

                <tr
                  key={venue._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4">

                    <img
                      src={
                        venue.image ||
                        "https://via.placeholder.com/80"
                      }
                      alt={venue.name}
                      className="w-20 h-14 rounded-lg object-cover"
                    />

                  </td>

                  <td className="p-4 font-semibold">
                    {venue.name}
                  </td>

                  <td className="p-4">
                    {venue.sport}
                  </td>

                  <td className="p-4">
                    {venue.city}
                  </td>

                  <td className="p-4 font-bold text-green-600">
                    ₹ {venue.price}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">

                                            <Link
                        to={`/admin/edit-venue/${venue._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition"
                      >
                        ✏ Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(venue._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {venues.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 text-lg"
                  >

                    No Venues Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default ManageVenues;