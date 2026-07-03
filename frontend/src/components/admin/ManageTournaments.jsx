import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  getAllTournaments,
  deleteTournament,
} from "../../api/tournamentApi";

const ManageTournaments = () => {

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {

    try {

      const res = await getAllTournaments();

      setTournaments(res.data.tournaments);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this tournament?"
    );

    if (!ok) return;

    try {

      await deleteTournament(id);

      alert("Tournament Deleted");

      fetchTournaments();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  const filtered = useMemo(() => {

    return tournaments.filter((item) => {

      const searchMatch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const sportMatch =
        sportFilter === "All"
          ? true
          : item.sport === sportFilter;

      return searchMatch && sportMatch;

    });

  }, [tournaments, search, sportFilter]);

  const sports = [
    "All",
    ...new Set(
      tournaments.map((t) => t.sport)
    ),
  ];

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-3xl font-bold">

          Loading...

        </h1>

      </div>

    );

  }

  return (

<>
<Header />

<div className="min-h-screen bg-gray-100 py-10">

<div className="max-w-7xl mx-auto">

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex justify-between items-center mb-8">

<h1 className="text-4xl font-bold">

🏆 Manage Tournaments

</h1>

<div className="text-xl font-semibold">

Total : {filtered.length}

</div>

</div>

<div className="grid md:grid-cols-2 gap-5 mb-8">

<input
type="text"
placeholder="Search Tournament..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
className="border rounded-xl p-3"
/>

<select
value={sportFilter}
onChange={(e)=>
setSportFilter(e.target.value)
}
className="border rounded-xl p-3"
>

{
sports.map((sport)=>(
<option
key={sport}
value={sport}
>

{sport}

</option>
))
}

</select>

</div>

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="bg-blue-600 text-white">

<th className="p-4">Title</th>

<th className="p-4">Sport</th>

<th className="p-4">City</th>

<th className="p-4">Date</th>

<th className="p-4">Fee</th>

<th className="p-4">Players</th>

<th className="p-4">Organizer</th>

<th className="p-4">Actions</th>

</tr>

</thead>

<tbody>

{

filtered.map((item)=>{

const eventDate = new Date(item.date);

const today = new Date();

let status = "Upcoming";

if(eventDate < today){

status="Completed";

}

return(

<tr
key={item._id}
className="border-b hover:bg-gray-50"
>

<td className="p-4 font-semibold">

{item.title}

<br/>

<span
className={`text-xs px-2 py-1 rounded-full
${
status==="Upcoming"
?
"bg-green-100 text-green-700"
:
"bg-gray-200 text-gray-700"
}`}
>

{status}

</span>

</td>

<td className="p-4">

{item.sport}

</td>

<td className="p-4">

{item.city}

</td>

<td className="p-4">

{new Date(item.date).toLocaleDateString()}

</td>

<td className="p-4">

₹ {item.fee}

</td>

<td className="p-4">

{item.participants.length} / {item.maxPlayers}

</td>

<td className="p-4">

{item.createdBy?.name}

</td>

<td className="p-4">

<div className="flex gap-2">

<button

className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"

>

Edit

</button>

<button

onClick={()=>handleDelete(item._id)}

className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"

>

Delete

</button>

</div>

</td>

</tr>

)

})

}

</tbody>

</table>

</div>

</div>

</div>

</div>

<Footer />

</>

);

};

export default ManageTournaments;