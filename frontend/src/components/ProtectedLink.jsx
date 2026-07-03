import { useState } from "react";
import { Link } from "react-router-dom";
import LoginRequiredModal from "./LoginRequiredModal";

function ProtectedLink({ to, children, className }) {

  const [open, setOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  if (isLoggedIn) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>

      <LoginRequiredModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default ProtectedLink;