import { useState } from "react";
import { addVenue } from "../api/venueApi";
import { useNavigate } from "react-router-dom";

const AddVenue = () => {

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
    image: null,
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      setForm({
        ...form,
        image: files[0],
      });

    } else {

      setForm({
        ...form,
        [name]: value,
      });

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {

      setLoading(true);

      await addVenue(formData);

      alert("✅ Venue Added Successfully");

      navigate("/admin/manage-venues");

    } catch (err) {

      console.log(err);

      alert("❌ Error Adding Venue");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6">

          <button
            onClick={() => navigate("/admin/manage-venues")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            Add Venue
          </h1>

          <div></div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Venue Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="sport"
              placeholder="Sport"
              value={form.sport}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price Per Hour"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg h-28"
            />

            <input
              type="text"
              name="mapLink"
              placeholder="Google Map Link"
              value={form.mapLink}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold"
            >
              {loading ? "Adding..." : "Add Venue"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AddVenue;