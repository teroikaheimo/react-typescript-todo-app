import { useEffect, useState } from "react";
import { TodoList } from "../todoList/TodoList";
import { todoService } from "../todoService";
import { Spinner } from "../../spinner/SpinnerComponent";
import { ITodoItem } from "../types/ITodoItem";
import styles from "./TodoContainer.module.css";

export function TodoContainer() {
  const [todoItems, setTodoItems] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // This effect is run only once when the component is mounted.
  useEffect(() => {
    const subscription = todoService
      .getTodoStateChangedSubject()
      .subscribe((todoItems: ITodoItem[]) => {
        setTodoItems(todoItems);
        setIsDataLoaded(true);
      });
    todoService.remoteFetchItems();
    // Clean up the subscription to avoid memory leaks.
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div id="todo-container-root" className={styles.root}>
      <div className={styles.innerContainer}>
        {isDataLoaded ? (
          <TodoList todoItems={todoItems}></TodoList>
        ) : (
          <Spinner></Spinner>
        )}
      </div>
    </div>
  );
}
