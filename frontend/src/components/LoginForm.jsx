import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../api/authApi";

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

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
        await loginUser(formData);

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

      alert("Login Successful 🎉");

      navigate("/dashboard");

      window.location.reload();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
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
          Welcome Back
        </h2>

        <p className="mt-5 text-slate-300 text-lg">
          Continue your sports journey and connect with players around you.
        </p>

        <div className="mt-10 space-y-4">

          <div>⚽ Football Matches</div>
          <div>🏏 Cricket Partners</div>
          <div>🏸 Badminton Players</div>
          <div>♟ Chess Community</div>

        </div>

      </div>

      {/* Right Side */}
      <div className="p-10">

        <h2 className="text-4xl font-bold text-center">
          Login
        </h2>

        <p className="text-center text-slate-500 mt-2">
          Access your PlayConnect account
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mt-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Password"
              value={
                formData.password
              }
              onChange={handleChange}
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="flex justify-between mt-4 text-sm">

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              Remember Me

            </label>

            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-xl mt-5 font-semibold hover:bg-blue-700 transition"
          >
            {loading
              ? "Logging In..."
              : "Login"}
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

          Continue with Google

        </button>

      </div>

    </div>
  );
}

export default LoginForm;