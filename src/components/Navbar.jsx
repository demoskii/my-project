import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {isLoggedIn && (
        <p
          style={{
            marginBottom: "6px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Welcome, {username}
        </p>
      )}

      <nav style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "#61dafb",
              cursor: "pointer",
              padding: 0,
              font: "inherit",
              textDecoration: "underline",
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
