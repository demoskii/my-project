import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [fadingId, setFadingId] = useState(null);

  const username = JSON.parse(localStorage.getItem("user"))?.username || "User";

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Failed to load todos:", err));
  }, [navigate]);

  const handleAddTodo = async () => {
    if (!newTask.trim()) return;

    const newTodo = {
      task: newTask.trim(),
    };

    try {
      const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      const data = await res.json();
      setTodos((prev) => [...prev, data]);
      setNewTask("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleDelete = (id) => {
    setFadingId(id);

    setTimeout(() => {
      fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      }).then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setFadingId(null);
      });
    }, 300);
  };

  const handleUpdate = async (id, updatedText) => {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: updatedText }),
      });

      const data = await res.json();

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, task: data.task } : todo))
      );
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p className="welcome-text">Welcome, {username}</p>

      <div className="todo-input">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <p style={{ color: "#888", marginBottom: "10px" }}>
        💡 <em>Click a task to edit it</em>
      </p>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            fadeOut={fadingId === todo.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
