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

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 py-6 px-4 md:px-8">

      <div className="max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">

          <button
            onClick={() => navigate("/admin/manage-venues")}
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            ← Back
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-center">
            ➕ Add Venue
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
              required
            />

            <input
              type="text"
              name="sport"
              placeholder="Sport"
              value={form.sport}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 md:col-span-2"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price Per Hour"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={5}
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

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Venue Image
              </label>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold text-lg transition"
            >
              {loading ? "Adding Venue..." : "Add Venue"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AddVenue;
         