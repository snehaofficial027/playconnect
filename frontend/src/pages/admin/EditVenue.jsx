import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVenue, updateVenue } from "../../api/venueApi";
import Sidebar from "../../components/admin/Sidebar";

const EditVenue = () => {

  const { id } = useParams();
  const navigate = useNavigate();

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
      await updateVenue(id, form);

      alert("✅ Venue Updated");

      navigate("/admin/manage-venues");

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Edit Venue
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            className="w-full border p-3 rounded"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Venue Name"
          />

          <input
            className="w-full border p-3 rounded"
            name="sport"
            value={form.sport}
            onChange={handleChange}
            placeholder="Sport"
          />

          <input
            className="w-full border p-3 rounded"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />

          <input
            className="w-full border p-3 rounded"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <input
            className="w-full border p-3 rounded"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            className="w-full border p-3 rounded"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <textarea
            className="w-full border p-3 rounded"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            className="w-full border p-3 rounded"
            name="mapLink"
            value={form.mapLink}
            onChange={handleChange}
            placeholder="Google Map Link"
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Update Venue
          </button>

        </form>

      </div>

    </div>
  );

};

export default EditVenue;