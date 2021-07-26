import React from "react";
import { Container, Card, CardContent, List, ListItem, ListItemIcon, Checkbox, ListItemText, IconButton, TextField } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { ReactComponent as WipIcon } from "./in-progress.svg";
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, inProgressTodo }) {

  return (
    <>
      <ListItem className="todo-item">
        <ListItemIcon>
          <Checkbox
            checked={todo.isCompleted ? true : false}
            name="checkmark"
            onChange={() => completeTodo(index)}
          />
        </ListItemIcon>
        <ListItemText
          style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          primary={`${todo.text}`}
        />
        <IconButton edge="end" aria-label="work in progress" onClick={() => inProgressTodo(index)}>
          <WipIcon className="wip-icon" />
        </IconButton>
        <IconButton edge="end" aria-label="delete to do" onClick={() => removeTodo(index)}>
          <DeleteForeverOutlinedIcon color="secondary" />
        </IconButton>
      </ListItem>
      <LinearProgress variant="determinate" color="primary"
        value={todo.isCompleted ? 100 : todo.inProgress ? 50 : 0}
        style={{ width: "100%" }} />
    </>
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
    <form className="add-form" onSubmit={handleSubmit}>
      <TextField
        label="Add To Do"
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
    !newTodos[index].isCompleted ? newTodos[index].isCompleted = true : newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    newTodos[0].checked = false;
    setTodos(newTodos);
  };

  const inProgressTodo = index => {
    const newTodos = [...todos];
    !newTodos[index].inProgress ? newTodos[index].inProgress = true : newTodos[index].inProgress = false;
    setTodos(newTodos);
  };




  return (
    <Container className="todo-app" maxWidth="sm">
      <Card className="todo-card">
        <CardContent>
          <List className="todo-list">
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
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;