import React, { useState } from "react";
import "./Todo.css";
import { List, ListItem, ListItemText, Modal, Input } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import UpdateIcon from "@material-ui/icons/Update";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import blop from "./sounds/blop.wav";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: "#476A6F",
    border: "2px solid #476A6F",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 1,
    color: "#eae6e5",
  },
  buttons: {
    color: "#eae6e5",
    paddingLeft: "20px",
  },
}));

function Todo(props) {
  const blopAudio = new Audio(blop);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const playSound = (audioFile) => {
    audioFile.play();
  };

  const updateTodo = (event) => {
    event.preventDefault();
    //update the Todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setInput("");
    setOpen(false);
    playSound(blopAudio);
  };
  return (
    <>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={classes.paper}
        >
          <Input
            style={{
              color: "#eae6e5",
            }}
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <UpdateIcon className="todo__buttons__update" onClick={updateTodo} />
        </div>
      </Modal>

      <List className="todo__list">
        <ListItem className="todo__list__item">
          <ListItemText primary={props.todo.todo} />
        </ListItem>
        <div className="todo__buttons">
          <EditIcon
            className="todo__buttons__edit"
            onClick={(e) => {
              setOpen(true);
              playSound(blopAudio);
            }}
          />

          <CancelIcon
            className="todo__buttons__delete"
            onClick={(event) => {
              db.collection("todos").doc(props.todo.id).delete();
              playSound(blopAudio);
            }}
          />
        </div>
      </List>
    </>
  );
}

export default Todo;
