import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";
import { FcFullTrash, FcSignature, FcOk } from "react-icons/fc";
import { FaReact } from "react-icons/fa";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus on initial render
  });

  const addTodo = () => {
    const trimmedTodo = todo.trim(); // Trim whitespace from the input

    if (trimmedTodo !== "") {
      setTodos([
        ...todos,
        { list: trimmedTodo, id: Date.now(), status: false },
      ]);
      setTodo("");
    }

    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      if (trimmedTodo !== null && trimmedTodo !== "") {
        const updateTodo = todos.map((to) =>
          to.id === editTodo.id ? { id: to.id, list: trimmedTodo } : to
        );
        setTodos(updateTodo);
        setEditId(0);
        setTodo("");
      } else {
        onDelete(editId); // Delete the todo with null value or empty string
        setEditId(0);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((to) => {
      if (to.id === id) {
        return { ...to, status: !to.status };
      }
      return to;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);

    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h3>ToDo APP Using - <FaReact  className="list-item-icons"/> </h3>
      <form className="form-group" onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your ToDo..."
          name="text"
          title="Task"
          className="input"
          ref={inputRef}
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo} className="button">
          {editId ? "Edit" : "Add"}
        </button>
      </form>
      <div>
        <ul className="list">
          {todos.map((to) => (
            <li className="list-items" key={to.id}>
              <div
                className="list-item-list"
                id={to.status ? "list-item" : ""}
                title="Task"
              >
                {to.list}
                <div className="list-item-details">
                  {new Date(to.id).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  {" , "}
                  {/* Display time */}
                  {new Date(to.id).toLocaleDateString()} {/* Display date */}
                </div>
              </div>
              <span className="list-item-icons-container">
                <FcOk
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <FcSignature
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <FcFullTrash
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
