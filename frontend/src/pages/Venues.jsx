import { useState } from "react";
import VenueCard from "../components/VenueCard";
import VenueFilter from "../components/VenueFilter";

function Venues() {
  const [venues] = useState([
    {
      _id: 1,
      name: "Elite Cricket Ground",
      location: "Ahmedabad",
      sport: "Cricket",
      price: 800,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
    },
    {
      _id: 2,
      name: "Champion Football Arena",
      location: "Surat",
      sport: "Football",
      price: 700,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200",
    },
    {
      _id: 3,
      name: "Smash Badminton Club",
      location: "Rajkot",
      sport: "Badminton",
      price: 500,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200",
    },
    {
      _id: 4,
      name: "Royal Basketball Court",
      location: "Vadodara",
      sport: "Basketball",
      price: 600,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200",
    },
  ]);

  const [filteredVenues, setFilteredVenues] = useState(venues);

  const handleSearch = ({ city, sport }) => {
    let result = venues;

    if (city) {
      result = result.filter((v) =>
        v.location.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (sport) {
      result = result.filter((v) => v.sport === sport);
    }

    setFilteredVenues(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 sm:py-10">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3">
          🏟 Sports Venue Finder
        </h1>

        <p className="text-center text-gray-500 mb-8 sm:mb-10 text-sm sm:text-base">
          Discover nearby sports venues across India
        </p>

        {/* Filter */}
        <div className="mb-6">
          <VenueFilter onSearch={handleSearch} />
        </div>

        {/* Grid */}
        {filteredVenues.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue._id} venue={venue} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No venues found 😕
          </div>
        )}

      </div>
    </div>
  );
}

export default Venues;