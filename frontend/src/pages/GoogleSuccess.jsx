import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const user = params.get("user");

    if (token) {

      localStorage.setItem("token", token);

    }

    if (user) {

      localStorage.setItem(
        "user",
        decodeURIComponent(user)
      );

    }

    navigate("/dashboard");

  }, []);

  return <h1>Logging In...</h1>;

}

export default GoogleSuccess;