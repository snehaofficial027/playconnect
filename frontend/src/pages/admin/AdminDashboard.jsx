import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DashboardCard from "../../components/admin/DashboardCard";
import { getDashboard } from "../../api/adminApi";

const AdminDashboard = () => {

const [data,setData]=useState(null);

useEffect(()=>{

loadDashboard();

},[]);

const loadDashboard=async()=>{

try{

const res=
await getDashboard();

setData(res.data);

}catch(err){

console.log(err);

}

};

if(!data){

return(
<div className="flex">

<Sidebar/>

<div className="flex-1 flex justify-center items-center">

Loading...

</div>

</div>
);

}

return(

<div className="flex bg-slate-100 min-h-screen">

<Sidebar/>

<div className="flex-1 p-8">

<h1 className="text-4xl font-bold mb-8">

Admin Dashboard

</h1>

<div className="grid grid-cols-4 gap-6">

<DashboardCard
title="Users"
value={data.totalUsers}
color="bg-blue-600"
/>

<DashboardCard
title="Venues"
value={data.totalVenues}
color="bg-green-600"
/>

<DashboardCard
title="Bookings"
value={data.totalBookings}
color="bg-orange-600"
/>

<DashboardCard
title="Tournaments"
value={data.totalTournaments}
color="bg-purple-600"
/>

</div>

<div className="grid grid-cols-2 gap-8 mt-10">

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-2xl font-bold mb-5">

Latest Users

</h2>

{data.latestUsers.map(user=>(

<div
key={user._id}
className="border-b py-3"
>

{user.name}

</div>

))}

</div>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-2xl font-bold mb-5">

Latest Bookings

</h2>

{data.latestBookings.map(booking=>(

<div
key={booking._id}
className="border-b py-3"
>

{booking.user?.name}

{" → "}

{booking.venue?.name}

</div>

))}

</div>

</div>

</div>

</div>

);

};

export default AdminDashboard;