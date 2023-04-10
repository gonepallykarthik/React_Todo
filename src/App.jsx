import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const items = localStorage.getItem("ITEMS");
    if (items.length == 0) return [];

    return JSON.parse(items);
  });
  const [text, setText] = useState("Enter title of the todo");

  //updating the form
  function updateHandler(id, completed) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            completed: completed,
          };
        }
        return todo;
      });
    });
  }

  // delete a todo
  function deleteTodo(id) {
    const updated = todos.filter((todo) => todo.id != id);
    setTodos(updated);
  }

  //submitting form
  function submitHandler(e) {
    e.preventDefault();

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.floor(Math.random() * 10),
          title: text,
          completed: false,
        },
      ];
    });
  }

  useEffect(() => {
    const items = JSON.stringify(todos);
    localStorage.setItem("ITEMS", items);
  }, [todos]);

  return (
    <div className="App">
      <h1 className="title">This is a basic Todo App</h1>
      <form onSubmit={submitHandler}>
        <div className="form_element">
          <input
            value={text}
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Enter Todo"
            maxLength={40}
          />
          <button>submit</button>
        </div>
      </form>
      <hr></hr>
      <h1>{todos.length > 0 ? "Todo List" : "There are no Todos"}</h1>
      <div className="List">
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                updateHandler(todo.id, e.target.checked);
              }}
            />
            <h1>{todo.title}</h1>
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
