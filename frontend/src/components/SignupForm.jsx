import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../api/authApi";

function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  useEffect(() => {
    const user =
      localStorage.getItem("user");

    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

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

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      alert(
        "Account Created Successfully 🎉"
      );

      navigate("/dashboard");

      window.location.reload();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-12 hidden lg:flex flex-col justify-center">

        <h2 className="text-5xl font-bold">
          Join PlayConnect
        </h2>

        <p className="mt-5 text-slate-300 text-lg">
          Meet players, join tournaments and discover sports communities.
        </p>

        <div className="mt-10 space-y-4">

          <div>🤝 Connect Players</div>
          <div>🏆 Join Tournaments</div>
          <div>💬 Real-Time Chat</div>
          <div>🤖 AI Recommendations</div>

        </div>

      </div>

      {/* Right Side */}
      <div className="p-10">

        <h2 className="text-4xl font-bold text-center">
          Create Account
        </h2>

        <p className="text-center text-slate-500 mt-2">
          Start your sports journey today
        </p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
        >

          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mt-8 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <div className="relative mt-4">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-5 text-slate-500"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white p-4 rounded-xl mt-5 font-semibold hover:bg-green-600 transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="flex items-center gap-3 my-5">

          <hr className="flex-1" />

          <span className="text-slate-500">
            OR
          </span>

          <hr className="flex-1" />

        </div>

        <button className="w-full border p-4 rounded-xl flex justify-center items-center gap-3 font-semibold hover:bg-slate-50 transition">

          <FcGoogle size={25} />

          Signup with Google

        </button>

      </div>

    </div>
  );
}

export default SignupForm;