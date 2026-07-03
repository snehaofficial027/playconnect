import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi";

function Signup() {

const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
});

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]: e.target.value,
});


};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  const response =
    await registerUser(formData);

  localStorage.setItem(
    "token",
    response.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(
      response.data.user
    )
  );

  alert(
    "Signup Successful ✅"
  );

  navigate("/dashboard");

} catch (error) {

  alert(
    error.response?.data?.message ||
    "Signup Failed"
  );

}


};

const handleGoogleSignup = () => {
window.location.href =
"http://localhost:5000/api/auth/google";
};

return ( <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">


  <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-12 hidden lg:flex flex-col justify-center">

      <h1 className="text-5xl font-bold">
        Join PlayConnect
      </h1>

      <p className="mt-6 text-slate-300 text-lg">
        Create your account and find sports partners nearby.
      </p>

    </div>

    <div className="p-10">

      <h2 className="text-4xl font-bold text-center text-slate-900">
        Signup
      </h2>

      <form
        className="mt-8"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-4 rounded-xl mb-4"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border p-4 rounded-xl mb-4"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-4 rounded-xl font-semibold hover:bg-green-600"
        >
          Create Account
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border mt-4 p-4 rounded-xl font-semibold"
        >
          Continue with Google
        </button>

      </form>

      <p className="text-center mt-6 text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold"
        >
          Login
        </Link>
      </p>

    </div>

  </div>

</div>

);
}

export default Signup;
