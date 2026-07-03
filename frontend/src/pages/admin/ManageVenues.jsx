import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { getAllVenues, deleteVenue } from "../../api/venueApi";

const ManageVenues = () => {

  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);

  const loadVenues = async () => {
    try {
      const res = await getAllVenues();
      setVenues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this venue?"
  );

  if (!confirmDelete) return;

  try {

    await deleteVenue(id);

    alert("✅ Venue Deleted Successfully");

    loadVenues();

  } catch (err) {

    console.log(err);

    alert("❌ Failed to Delete Venue");

  }

};

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="flex justify-between mb-8">

          <h1 className="text-4xl font-bold">
            Manage Venues
          </h1>

          <Link
            to="/admin/add-venue"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            + Add Venue
          </Link>

        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4">Image</th>

                <th>Name</th>

                <th>Sport</th>

                <th>City</th>

                <th>Price</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {venues.map((venue) => (

                <tr
                  key={venue._id}
                  className="border-b text-center"
                >

                  <td className="p-3">

                    <img
                      src={
                        venue.image ||
                        "https://via.placeholder.com/80"
                      }
                      alt={venue.name}
                      className="w-20 h-14 object-cover rounded mx-auto"
                    />

                  </td>

                  <td>{venue.name}</td>

                  <td>{venue.sport}</td>

                  <td>{venue.city}</td>

                  <td>₹ {venue.price}</td>

                  <td>

                   <Link
  to={`/admin/edit-venue/${venue._id}`}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Edit
</Link>

<button
  onClick={() => handleDelete(venue._id)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
>
  Delete
</button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default ManageVenues;