import { BrowserRouter, Routes, Route } from "react-router-dom";
import Requests from "./pages/Requests";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Connections from "./pages/Connections";
import Chat from "./pages/Chat";
import Tournaments from "./pages/Tournaments";
import CreateTournament from "./pages/createTournaments";
import PlayerProfile from "./pages/PlayerProfile";
import MyTournaments from "./pages/MyTournaments";
import TournamentDetails from "./pages/TournamentDetails";
import GoogleSuccess from "./pages/GoogleSuccess";
import AISuggestions from "./pages/AISuggestions";
import ai from "./pages/ai";
import VenueList from "./pages/VenueList";
import VenueBooking from "./pages/VenueBooking";
import AdminRoute from "./components/AdminRoute";
import AddVenue from "./pages/AddVenue";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageVenues from "./pages/admin/ManageVenues";
import EditVenue from "./pages/admin/EditVenue";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";
import VenueDetails from "./pages/VenueDetails";
import MyBookings from "./pages/MyBookings";
import ManageTournaments from "./pages/admin/ManageTournaments";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/players"
  element={
    <ProtectedRoute>
      <Players />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
path="/requests"
element={
<ProtectedRoute>
<Requests />
</ProtectedRoute>
}
/>

<Route
  path="/connections"
  element={
    <ProtectedRoute>
      <Connections />
    </ProtectedRoute>
  }
/>

<Route
path="/chat/:id"
element={
<ProtectedRoute>
<Chat />
</ProtectedRoute>
}
/>

<Route
path="/tournaments"
element={
<ProtectedRoute>
<Tournaments />
</ProtectedRoute>
}
/>

<Route
path="/create-tournament"
element={
<ProtectedRoute>
<CreateTournament />
</ProtectedRoute>
}
/>

<Route
  path="/player/:id"
  element={
    <ProtectedRoute>
      <PlayerProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-tournaments"
  element={
    <ProtectedRoute>
      <MyTournaments />
    </ProtectedRoute>
  }
/>

<Route
  path="/tournament/:id"
  element={<TournamentDetails />}
/>

<Route
  path="/google-success"
  element={<GoogleSuccess />}
/>

<Route path="/venues" element={<VenueList />} />

 <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/add-venue"
  element={
    <AdminRoute>
      <AddVenue />
    </AdminRoute>
  }
/>

<Route
  path="/admin/manage-venues"
  element={
    <AdminRoute>
      <ManageVenues />
    </AdminRoute>
  }
/>

<Route
  path="/admin/edit-venue/:id"
  element={
    <AdminRoute>
      <EditVenue />
    </AdminRoute>
  }
/>

<Route
  path="/admin/bookings"
  element={
    <AdminRoute>
      <ManageBookings />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <ManageUsers />
    </AdminRoute>
  }
/>

<Route
  path="/venue-details/:id"
  element={<VenueDetails />}
/>

<Route
  path="/venue/:id"
  element={<VenueBooking />}
/>

<Route
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/manage-tournaments"
  element={
    <AdminRoute>
      <ManageTournaments />
    </AdminRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;