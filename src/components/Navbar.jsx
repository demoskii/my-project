import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const username = JSON.parse(localStorage.getItem("user"))?.username || "";
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {isLoggedIn && (
        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Welcome, {username}
        </p>
      )}

      <nav>
        <Link to="/">Home</Link>
        <span className="divider">|</span>
        {isLoggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="divider">|</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <span className="divider">|</span>
            <Link to="/register">Register</Link>
          </>
        )}
        <span className="divider">|</span>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </nav>
    </div>
  );
}

export default Navbar;
