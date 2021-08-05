import React from "react";
import { Container, Card, CardContent, List, ListItem, ListItemIcon, Checkbox, ListItemText, IconButton, TextField } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { ReactComponent as WipIcon } from "./in-progress.svg";
import './App.css';

const theme = createTheme({
  typography: {
    fontSize: 16,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    background: "lightskyblue",
    height: "100vh",
    padding: "25px",
    minWidth: "400px"
  },
  todoItem: {
    padding: '5px',
    marginBottom: '5px'
  },
  todoText: {
    fontSize: 50
  },
  barBackground: {
    backgroundColor: "lightgrey",
  },
  bar: {
    backgroundColor: 'green'
  }
}));

function Todo({ todo, index, completeTodo, removeTodo, inProgressTodo }) {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.todoItem}>
        <ListItemIcon>
          <Checkbox
            style={{ color: todo.isCompleted ? "green" : "" }}
            checked={todo.isCompleted ? true : false}
            name="checkmark"
            onChange={() => completeTodo(index)}
          />
        </ListItemIcon>
        <ListItemText classes={{ root: classes.todoText }}
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
      <LinearProgress classes={{
        colorPrimary: classes.barBackground,
        bar: classes.bar,
      }} variant="determinate"
        value={todo.isCompleted ? 100 : todo.inProgress ? 50 : 0} />
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

export default function App() {
  const classes = useStyles();
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
    <ThemeProvider theme={theme}>
      <Container className={classes.root} maxWidth="sm">
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
    </ThemeProvider>
  );
}