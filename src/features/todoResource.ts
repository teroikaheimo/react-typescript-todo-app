import Axios from "axios";
import { ITodoItem } from "./todo/types/ITodoItem";

/** Handles the communication with todo API. */
class TodoResource {
  getTodoItems() {
    return Axios.get("/api/v1/todo");
  }
  syncState(items: ITodoItem[]) {
    return Axios.post("/api/v1/todo/sync", items);
  }
}
export const todoResource = new TodoResource();
