import { TodoListItem } from "../todoListItem/TodoListItem";
import { ITodoItem } from "../types/ITodoItem";
import styles from "./TodoList.module.css";
import "./TodoListOverride.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { todoService } from "../todoService";

export function TodoList(props: { todoItems: ITodoItem[] }) {
  function handleAddClick() {
    todoService.createItem();
  }

  const header = (
    <div id="todo-list-header" className={styles.header}>
      To-do
    </div>
  );
  const footer = (
    <span id="todo-list-footer" className={styles.footer}>
      <Button
        id="todo-list-add-button"
        icon="pi pi-plus"
        className="p-button-rounded p-button-info"
        aria-label="Add"
        onClick={handleAddClick}
      />
    </span>
  );
  return (
    <Card
      id="todo-list-container"
      className={styles.card + " override-card-styles"}
      footer={footer}
      header={header}
    >
      <div>
        {props.todoItems.map((item) => (
          <TodoListItem key={item.id} item={item}></TodoListItem>
        ))}
      </div>
    </Card>
  );
}
