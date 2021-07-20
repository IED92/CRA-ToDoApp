import React from "react";
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, inProgressTodo }) {
  return (
    <div className="todo-item"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
        border: !todo.isCompleted && todo.inProgress ? "2px solid green" : ""
      }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}><span role="img" aria-label="mark done">✔️</span></button>
        <button onClick={() => inProgressTodo(index)}><span role="img" aria-label="work in progress">🚧</span></button>
        <button onClick={() => removeTodo(index)}><span role="img" aria-label="remove">❌</span></button>
      </div>
    </div>
  );
};

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Create React To-Do app using hooks",
      isCompleted: false,
      inProgress: false
    },
    {
      text: "Get internship",
      isCompleted: false,
      inProgress: false
    },
    {
      text: "???",
      isCompleted: false,
      inProgress: false
    },
    {
      text: "Profit",
      isCompleted: false,
      inProgress: false
    },
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const inProgressTodo = index => {
    const newTodos = [...todos];
    newTodos[index].inProgress = true;
    setTodos(newTodos);
  };

  return (
    <div className="todo-app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            inProgressTodo={inProgressTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;