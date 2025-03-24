import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // 🔐 Redirect if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // 📥 Fetch all tasks on load
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // ➕ Add task
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTodo = { text: newTask };
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const added = await res.json();
    setTodos([...todos, added]);
    setNewTask(""); // Clear input
  };

  // ❌ Delete task
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Your To-Do List</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
