import React, { useState } from "react";
import './App.css';

function Todo({ todo }) {
  return (
    <div className="todo-item">
      {todo.text}
    </div>
  );
};

function App() {
  const [todos, setTodos] = React.useState([
    { text: "Create React To-Do app using hooks"},
    { text: "Get internship"},
    { text: "???"},
    { text: "Profit"},
  ]);


return (
  <div className="todo-app">
    <div className="todo-list">
      {todos.map((todo, index) => (
        <Todo
        key={index}
        index={index}
        todo={todo}
        /> 
      ))}
    </div>
  </div> 
 );
}

export default App;