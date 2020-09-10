import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import blop from "./sounds/blop.wav";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper_input: {
    color: "#eae6e5",
  },
  button: {
    backgroundColor: "#eae6e5",
  },
}));

function App() {
  const blopAudio = new Audio(blop);
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when it load, we need app to listen to database and fetch new todos as they get added/removed
  useEffect(() => {
    //when app.js fires this code loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    playSound(blopAudio);
  };

  const playSound = (audioFile) => {
    audioFile.play();
  };

  return (
    <div className="app">
      <h1 className="app__title">Todo App</h1>
      <FormControl className="app__form">
        <InputLabel className={`'app__form__input' ${classes.paper_input} `}>
          Write a Todo
        </InputLabel>
        <Input
          className={classes.paper_input}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </FormControl>
      <Button
        className="app__form__button"
        disabled={!input}
        type="submit"
        onClick={addTodo}
        variant="contained"
        color="primary"
      >
        Add Todo
      </Button>

      <ul className="app__list">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
