import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl duration-300">

      <img
        src={venue.image}
        alt={venue.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {venue.name}
        </h2>

        <p className="text-gray-500 mt-2">
          📍 {venue.location}
        </p>

        <p className="text-gray-600 mt-2">
          {venue.sport}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-green-600 font-bold text-xl">
            ₹ {venue.price}/hour
          </span>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            ⭐ {venue.rating}
          </span>

        </div>

        <Link
          to={`/venues/${venue._id}`}
          className="block mt-5 text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default VenueCard;