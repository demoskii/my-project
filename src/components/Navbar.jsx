import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
