function TodoItem({ todo, onDelete }) {
    return (
      <li style={{ listStyleType: "disc", marginLeft: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => onDelete(todo.id)}
            style={{
              padding: "4px 10px",
              cursor: "pointer",
              borderRadius: "6px",
              backgroundColor: "#111",
              color: "#fff",
              border: "none",
            }}
          >
            Delete
          </button>
          <span>{todo.task}</span>
        </div>
      </li>
    );
  }
  
  export default TodoItem;
  