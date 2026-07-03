import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { createTournament } from "../api/tournamentApi";

function CreateTournament() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    city: "",
    date: "",
    fee: "",
    maxPlayers: "",
    description: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    try {

      setLoading(true);

      await createTournament(formData);

      alert("Tournament Created Successfully 🏆");

      setFormData({
        title: "",
        sport: "",
        city: "",
        date: "",
        fee: "",
        maxPlayers: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-100 py-10">

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-8">
            Create Tournament 🏆
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Tournament Name"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="text"
              name="sport"
              value={formData.sport}
              placeholder="Sport"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="City"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="number"
              name="fee"
              value={formData.fee}
              placeholder="Entry Fee"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <input
              type="number"
              name="maxPlayers"
              value={formData.maxPlayers}
              placeholder="Maximum Players"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              placeholder="Tournament Description"
              onChange={handleChange}
              className="w-full border p-4 rounded-xl"
              rows="4"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Tournament"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default CreateTournament;