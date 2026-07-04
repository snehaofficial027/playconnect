import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVenue, updateVenue } from "../../api/venueApi";
import Sidebar from "../../components/admin/Sidebar";

const EditVenue = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sport: "",
    city: "",
    address: "",
    price: "",
    phone: "",
    description: "",
    mapLink: "",
  });

  useEffect(() => {
    loadVenue();
  }, []);

  const loadVenue = async () => {
    try {
      const res = await getVenue(id);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      await updateVenue(id, form);

      alert("✅ Venue Updated Successfully");

      navigate("/admin/manage-venues");

    } catch (err) {

      console.log(err);

      alert("Update Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-4 md:p-8">

        <div className="max-w-4xl mx-auto">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">

            <button
              onClick={() => navigate("/admin/manage-venues")}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl"
            >
              ← Back
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-center">
              ✏ Edit Venue
            </h1>

            <div className="hidden sm:block w-24"></div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-5 md:p-8">

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
                            <input
                type="text"
                name="name"
                placeholder="Venue Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 md:col-span-2"
              />

              <input
                type="text"
                name="sport"
                placeholder="Sport"
                value={form.sport}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 md:col-span-2"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows={5}
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 md:col-span-2"
              />

              <input
                type="text"
                name="mapLink"
                placeholder="Google Map Link"
                value={form.mapLink}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 md:col-span-2"
              />

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold text-lg transition"
              >
                {loading ? "Updating Venue..." : "Update Venue"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

};

export default EditVenue;