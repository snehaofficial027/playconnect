import {
  FaTimes,
  FaMapMarkerAlt,
  FaFutbol,
  FaStar,
} from "react-icons/fa";

function PlayerModal({
  player,
  onClose,
}) {
  if (!player) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          <FaTimes />
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-green-500 p-8">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <img
              src={
                player.profileImage ||
                `https://ui-avatars.com/api/?name=${player.name}&background=2563EB&color=fff`
              }
              alt=""
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />

            <div>

              <h2 className="text-4xl font-bold">
                {player.name}
              </h2>

              <p className="text-blue-100">
                Active Sports Player
              </p>

            </div>

          </div>

        </div>

        <div className="p-6">

          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-slate-800 p-4 rounded-xl">

              <FaMapMarkerAlt />

              <h3 className="font-bold mt-2">
                City
              </h3>

              <p>{player.city}</p>

            </div>

            <div className="bg-slate-800 p-4 rounded-xl">

              <FaFutbol />

              <h3 className="font-bold mt-2">
                Sport
              </h3>

              <p>{player.sport}</p>

            </div>

            <div className="bg-slate-800 p-4 rounded-xl">

              <FaStar />

              <h3 className="font-bold mt-2">
                Skill
              </h3>

              <p>
                {player.skillLevel}
              </p>

            </div>

          </div>

          <div className="mt-6">

            <h3 className="font-bold text-xl mb-2">
              About Player
            </h3>

            <p className="text-slate-300">
              {player.bio}
            </p>

          </div>

          <button className="w-full mt-6 bg-green-500 hover:bg-green-600 p-4 rounded-xl font-bold">

            🤝 Send Match Request

          </button>

        </div>

      </div>

    </div>
  );
}

export default PlayerModal;