function AuthModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-3xl text-slate-500 hover:text-black z-20"
        >
          ×
        </button>

        {children}

      </div>

    </div>
  );
}

export default AuthModal;