import { useState } from "react";

function VenueFilter({ onSearch }) {
  const [city, setCity] = useState("");
  const [sport, setSport] = useState("");

  const handleSearch = () => {
    onSearch({ city, sport });
  };

  const handleReset = () => {
    setCity("");
    setSport("");
    onSearch({ city: "", sport: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">

      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        🔍 Find Sports Venue
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* City */}
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Sport */}
        <select
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Sport</option>
          <option>Cricket</option>
          <option>Football</option>
          <option>Badminton</option>
          <option>Basketball</option>
          <option>Tennis</option>
          <option>Volleyball</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            onClick={handleSearch}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3 font-semibold"
          >
            Search
          </button>

          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl px-5 py-3 font-semibold"
          >
            Reset
          </button>

        </div>

      </div>
    </div>
  );
}

export default VenueFilter;