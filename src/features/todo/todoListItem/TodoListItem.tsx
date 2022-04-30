import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { memo } from "react";
import { ChangeEvent, useReducer, useState } from "react";
import todoService from "../todoService";
import { ITodoItemProps } from "../types/ITodoItemProps";
import styles from "./TodoListItem.module.css";

const TodoListItem = (props: ITodoItemProps) => {
  const [isInEditMode, setIsInEditMode] = useState(props.item.openInEditState);
  const [editedText, setEditedText] = useState(props.item.text);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleDeleteButtonClick() {
    todoService.deleteItem(props.item.id);
  }

  function handleSaveClick() {
    todoService.changeItemText(props.item.id, editedText);
    setIsInEditMode(false);
  }

  function handleEditButtonClick() {
    setIsInEditMode(true);
  }

  function handleCancelButtonClick() {
    setEditedText(props.item.text);
    setIsInEditMode(false);
  }

  function handleItemClick() {
    todoService.changeItemDoneState(props.item.id, !props.item.done);
    // Since we are updating existing objects primitive value the change detection does not trigger, hence "force update".
    forceUpdate();
  }

  function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setEditedText(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      handleSaveClick();
    }
  }

  if (isInEditMode) {
    // EDIT MODE TEMPLATE
    return (
      <div className={styles.itemContainer}>
        <div className={styles.checkMarkContainer}>&nbsp;</div>
        <div className={styles.textContainer}>
          <InputTextarea
            style={{ width: "100%" }}
            value={editedText}
            onChange={(e) => handleOnChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
            rows={1}
            autoResize
          />
        </div>
        <div className={styles.editButtonsContainer}>
          <Button
            id="todo-item-save-button"
            onClick={handleSaveClick}
            icon="pi pi-check"
            className={
              styles.editButtons +
              " p-button-rounded p-button-outlined p-button-success"
            }
            aria-label="Save"
          />
          <Button
            id="todo-item-cancel-button"
            onClick={handleCancelButtonClick}
            icon="pi pi-times"
            className={
              styles.editButtons +
              " p-button-rounded p-button-outlined p-button-danger"
            }
            aria-label="Cancel"
          />
        </div>
      </div>
    );
  } else {
    // READ MODE TEMPLATE
    return (
      <div className={styles.itemContainer}>
        <div className={styles.checkMarkContainer}>
          {props.item.done}
          {props.item.done ? (
            <i
              id="todo-item-check-mark-element"
              style={{ color: "#22C55E" }}
              className="pi pi-check"
            ></i>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <div
          id="todo-item-text-element"
          onClick={handleItemClick}
          style={{ textDecoration: props.item.done && "line-through" }}
          className={styles.textContainer}
        >
          {props.item.text}
        </div>
        <div className={styles.editButtonsContainer}>
          <Button
            id="todo-item-edit-button"
            onClick={handleEditButtonClick}
            icon="pi pi-pencil"
            className={
              styles.editButtons +
              " p-button-rounded p-button-outlined p-button-primary"
            }
            aria-label="Edit"
          />
          <Button
            id="todo-item-delete-button"
            onClick={handleDeleteButtonClick}
            icon="pi pi-trash"
            className={
              styles.editButtons +
              " p-button-rounded p-button-outlined p-button-danger"
            }
            aria-label="Delete"
          />
        </div>
      </div>
    );
  }
};
export default memo(TodoListItem);
