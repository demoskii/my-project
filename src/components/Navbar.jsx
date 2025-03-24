import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn && (
        <p
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Welcome, {username}
        </p>
      )}

      <nav>
        <Link to="/">Home</Link>
        {!isLoggedIn && <> | <Link to="/login">Login</Link></>}
        {!isLoggedIn && <> | <Link to="/register">Register</Link></>}
        {isLoggedIn && <> | <Link to="/dashboard">Dashboard</Link></>}
        {isLoggedIn && <> | <button onClick={handleLogout}>Logout</button></>}
      </nav>
    </div>
  );
}

export default Navbar;
