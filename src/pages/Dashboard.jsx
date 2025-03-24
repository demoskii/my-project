import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTask }),
    });

    const data = await response.json();
    setTodos((prev) => [...prev, data]);
    setNewTask("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
<h2>Welcome, {localStorage.getItem("username")}!</h2>
