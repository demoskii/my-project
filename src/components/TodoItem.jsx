function TodoItem({ todo, onDelete, onUpdate }) {
    const handleDelete = () => {
      onDelete(todo.id);
    };
  
    const handleClick = () => {
      const newTask = prompt("Edit task:", todo.task);
      if (newTask !== null && newTask.trim() !== "") {
        onUpdate(todo.id, newTask.trim());
      }
    };
  
    return (
      <li
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          color: "#fff",
          animation: "fadeIn 0.3s ease",
        }}
      >
        <span style={{ marginRight: "10px" }}>•</span>
        <button
          onClick={handleDelete}
          style={{
            padding: "6px 12px",
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Delete
        </button>
        <span
          onClick={handleClick}
          style={{
            cursor: "pointer",
            fontSize: "16px",
            userSelect: "none",
          }}
        >
          {todo.task}
        </span>
      </li>
    );
  }
  
  export default TodoItem;
  