import React, { useState } from "react";
import "./Todo.css";
import { List, ListItem, ListItemText, Modal, Input } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import UpdateIcon from "@material-ui/icons/Update";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";

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
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

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
          <UpdateIcon onClick={updateTodo} />
        </div>
      </Modal>

      <List className="todo__list">
        <ListItem className="todo__list__item">
          <ListItemText primary={props.todo.todo} />
        </ListItem>
        <div className="todo__buttons">
          <EditIcon
            className={classes.buttons}
            onClick={(e) => setOpen(true)}
          />

          <CancelIcon
            className={classes.buttons}
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          />
        </div>
      </List>
    </>
  );
}

export default Todo;
