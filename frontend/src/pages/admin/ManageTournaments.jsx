import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  getAllTournaments,
  deleteTournament,
} from "../../api/tournamentApi";

const ManageTournaments = () => {

  const [tournaments, setTournaments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const loadTournaments = async () => {

    try {

      const res = await getAllTournaments();

      setTournaments(res.data);
      setFiltered(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadTournaments();

  }, []);

  useEffect(() => {

    const data = tournaments.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFiltered(data);

  }, [search, tournaments]);

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Are you sure you want to delete this tournament?"
    );

    if (!ok) return;

    try {

      await deleteTournament(id);

      alert("Tournament Deleted Successfully");

      loadTournaments();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              🏆 Tournament Management
            </h1>

            <p className="text-gray-500 mt-2">
              Total :
              <span className="font-bold text-blue-600 ml-2">
                {filtered.length}
              </span>

            </p>

          </div>

          <input
            type="text"
            placeholder="Search Tournament..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-xl px-5 py-3 w-80"
          />

        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

          {filtered.map((tournament) => (

            <div
              key={tournament._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5">

                <h2 className="text-2xl font-bold">

                  {tournament.title}

                </h2>

                <p className="mt-2">

                  🏆 {tournament.sport}

                </p>

              </div>

              <div className="p-5 space-y-3">

                <p>

                  📍 <b>City :</b>

                  {" "}

                  {tournament.city}

                </p>

                <p>

                  📅 <b>Date :</b>

                  {" "}

                  {new Date(
                    tournament.date
                  ).toLocaleDateString()}

                </p>

                <p>

                  👤 <b>Organizer :</b>

                  {" "}

                  {tournament.createdBy?.name || "Unknown"}

                </p>

                <p>

                  👥 <b>Participants :</b>

                  {" "}

                  {tournament.participants?.length || 0}

                  {" / "}

                  {tournament.maxPlayers}

                </p>

                <p>

                  💰 <b>Entry Fee :</b>

                  <span className="text-green-600 font-bold">

                    ₹ {tournament.fee}

                  </span>

                </p>

                <p>

                  📝 <b>Description :</b>

                  <br />

                  {tournament.description || "No Description"}

                </p>

                <button
                  onClick={() =>
                    handleDelete(tournament._id)
                  }
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
                >

                  🗑 Delete Tournament

                </button>

              </div>

            </div>

          ))}

          {filtered.length === 0 && (

            <div className="col-span-3 text-center text-gray-500 text-xl">

              No Tournament Found

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default ManageTournaments;