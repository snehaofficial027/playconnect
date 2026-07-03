import { useNavigate } from "react-router-dom";

function LoginRequiredModal({ isOpen, onClose }) {

  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[380px] text-center shadow-2xl">

        <div className="text-6xl mb-4">
          🔒
        </div>

        <h2 className="text-2xl font-bold mb-3">
          Login Required
        </h2>

        <p className="text-gray-600 mb-8">
          Please login or create an account
          to access this feature.
        </p>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/login")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            Signup
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-5 text-gray-500 hover:text-black"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default LoginRequiredModal;