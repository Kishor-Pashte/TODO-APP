import React, { useState, useEffect } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on first render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return; //for empty
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  // const handleDeleteTodo = (id) => {
  //   setTodos(todos.filter(t) => t.id !== todo.id)

  // }

  const handleMarkDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px 40px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Todo App</h2>
        <div style={{ display: "flex", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Enter a task...."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "8px",
              outline: "none",
              fontSize: "15px",
            }}
          />
          <button
            onClick={() => handleAddTodo()}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#667eea",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f7f7f7",
                marginBottom: "10px",
                padding: "10px 15px",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0, 0.25)",
              }}
            >
              <span
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                  color: todo.isDone ? "gray" : "black",
                }}
              >
                {todo.text}{" "}
              </span>
              <div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Delete
                </button>{" "}
                <button
                  onClick={() => handleMarkDone(todo.id)}
                  style={{
                    marginRight: "8px",
                    background: todo.isDone ? "#999" : "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  {todo.isDone ? "Undo" : "Done"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={{ color: "gray", marginTop: "10px" }}>No todos yet😴</p>
        )}
      </div>
    </div>
  );
}
