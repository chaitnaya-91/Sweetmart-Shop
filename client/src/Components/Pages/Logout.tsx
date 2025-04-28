import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setIsLoggedIn }) => { // Receive setIsLoggedIn prop
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout button clicked");

    try {
      // API call for logout
      await axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true });

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Logout successful!");

      // Update the logged-in state in the parent
      setIsLoggedIn(false); // Update state to reflect logout

      navigate("/sign-in"); // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed!");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full text-left"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
