import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Check for existing user
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else if (password !== confirmPass) {
      setError("Passwords do not match.");
    } else if (existingUser?.username === username) {
      setError("Username already exists.");
    } else {
      const newUser = { username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setError("");
      alert("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="password"
            placeholder="🔁 Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
