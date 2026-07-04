import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100">

      {/* Image */}
      <img
        src={venue.image}
        alt={venue.name}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
          {venue.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          📍 {venue.location}
        </p>

        <p className="text-blue-600 font-medium text-sm mt-1">
          🏅 {venue.sport}
        </p>

        {/* Price + Rating */}
        <div className="flex justify-between items-center mt-4">

          <span className="text-green-600 font-bold text-lg">
            ₹ {venue.price}
            <span className="text-gray-500 text-sm font-normal">
              /hr
            </span>
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            ⭐ {venue.rating}
          </span>

        </div>

        {/* Button */}
        <Link
          to={`/venues/${venue._id}`}
          className="mt-5 text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default VenueCard;