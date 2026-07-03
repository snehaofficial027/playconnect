import { useState } from "react";

function VenueFilter({ onSearch }) {

  const [city, setCity] = useState("");
  const [sport, setSport] = useState("");

  const handleSearch = () => {
    onSearch({
      city,
      sport,
    });
  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

      <h2 className="text-2xl font-bold mb-5">
        🔍 Find Sports Venue
      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sport}
          onChange={(e)=>setSport(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

          <option value="">
            Select Sport
          </option>

          <option>
            Cricket
          </option>

          <option>
            Football
          </option>

          <option>
            Badminton
          </option>

          <option>
            Basketball
          </option>

          <option>
            Tennis
          </option>

          <option>
            Volleyball
          </option>

        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3"
        >
          Search Venue
        </button>

      </div>

    </div>

  );
}

export default VenueFilter;