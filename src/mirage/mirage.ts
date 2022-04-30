import { createServer, Response } from "miragejs";
import { ITodoItem } from "../features/todo/types/ITodoItem";
import { loggerService } from "../services/loggerService";
/** Could not get Mirage model to work correctly, so this is a simple workaround for that. */
let todoItemsState: ITodoItem[] = [
  { id: 0, text: "Walk the dog", done: true },
  { id: 1, text: "Change tyres", done: false },
  { id: 2, text: "Walk the earth", done: false },
];
function replaceItems(items: ITodoItem[]) {
  todoItemsState = items;
}

let requestCount = 0;
createServer({
  routes() {
    // Get all
    this.get(
      "/api/v1/todo",
      (schema, request) => {
        requestCount++;
        // First request always fails.
        if (requestCount === 1) {
          return new Response(400);
        }
        return new Response(200, {}, JSON.stringify(todoItemsState));
      },
      { timing: 1500 }
    );

    // Sync state
    this.post(
      "/api/v1/todo/sync",
      (schema, request) => {
        requestCount++;
        // Every fifth request fails.
        if (requestCount % 5 === 0) {
          return new Response(400);
        }
        replaceItems(JSON.parse(request.requestBody));
        loggerService.logInfo("State after sync: ", todoItemsState);
        return new Response(200);
      },
      { timing: 1500 }
    );
  },
});
