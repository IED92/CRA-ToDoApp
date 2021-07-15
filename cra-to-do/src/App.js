import React, { useState } from "react";
import './App.css';

function Todo({ todo }) {
  return (
    <div className = "todo-item">
      {todo.text}
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
    <form onSubmit = {handleSubmit}>
      <input 
        type = "text"
        className = "input"
        value = {value}
        onChange = {e  => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "Create React To-Do app using hooks"},
    { text: "Get internship"},
    { text: "???"},
    { text: "Profit"},
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

return (
  <div className = "todo-app">
    <div className = "todo-list">
      {todos.map((todo, index) => (
        <Todo
        key = {index}
        index = {index}
        todo = {todo}
        /> 
      ))}
      <TodoForm addTodo = {addTodo} />
    </div>
  </div> 
 );
}

export default App;