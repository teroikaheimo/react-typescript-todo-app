import { debounceTime, filter, Subject } from "rxjs";
import { loggerService } from "../../services/loggerService";
import { toastService } from "../toast/ToastService";
import { todoResource } from "../todoResource";
import { ITodoItem } from "./types/ITodoItem";

/**
 * Stores the todo items local state and handles the state sync with the remote.
 */
class TodoService {
  /** Indicates that request has failed and is about to be retried. */
  requestIsInRetryState = false;

  /** Time in milliseconds to retry request. */
  timeToRetrySync = 5000;

  /** Subject that emits every time the todo local state changes. */
  private _todoStateChanged$ = new Subject();

  /** Subject that emits every time a state sync is requested */
  private _syncNeeded$ = new Subject<void>();

  /** Observable that emits every time a state sync is requested, previous state sync is not in retry and debounce time passed. */
  private _syncDebounced = this._syncNeeded$.pipe(
    filter(() => !this.requestIsInRetryState),
    debounceTime(2000)
  );

  // LOCAL STATE
  private _todoLocalState: ITodoItem[] = [];
  private get todoLocalState(): ITodoItem[] {
    return this._todoLocalState;
  }
  private set todoLocalState(value: ITodoItem[]) {
    this._todoLocalState = value;
    this._todoStateChanged$.next(this._todoLocalState);
  }

  constructor() {
    // Listen for sync needed calls and
    this._syncDebounced.subscribe(() => {
      this.remoteSyncState();
    });
  }

  /** Triggers a remote sync with debounce delay. */
  private requestRemoteSync() {
    this._syncNeeded$.next();
  }

  /** Return a Subject that emits every time the todo local state changes. */
  getTodoStateChangedSubject() {
    return this._todoStateChanged$;
  }

  async createItem() {
    let createdItem = this.getNewItemObject();
    this.todoLocalState = [...this.todoLocalState, createdItem];
    this.requestRemoteSync();
  }

  changeItemText(id: number, changedText: string) {
    const item = this.getItem(id);
    item.text = changedText;
    this.requestRemoteSync();
  }

  changeItemDoneState(id: number, state: boolean) {
    const item = this.getItem(id);
    item.done = state;
    this.requestRemoteSync();
  }

  deleteItem(id: number) {
    this.todoLocalState = this.todoLocalState.filter((item) => item.id !== id);
    this.requestRemoteSync();
  }

  private getItem(id: number) {
    return this.todoLocalState.find((item) => item.id === id);
  }

  /** Return a new todo item object with the next available id. */
  private getNewItemObject(): ITodoItem {
    let nextFreeIndex = 0;
    for (let i = 0; i < this._todoLocalState.length; i++) {
      if (nextFreeIndex < this._todoLocalState[i].id) {
        nextFreeIndex = this._todoLocalState[i].id;
      }
    }
    nextFreeIndex++;
    return {
      id: nextFreeIndex,
      text: "",
      done: false,
      openInEditState: true,
    };
  }

  /**
   * Fetches the todo items list from remote and on success emits the received data thru the todoStateChanged subject.
   * OBS! This request will automatically be repeated if it fails.
   */
  async remoteFetchItems() {
    try {
      const { data } = await todoResource.getTodoItems();
      this._todoLocalState = data;
      this._todoStateChanged$.next(this._todoLocalState);
    } catch (error) {
      this.handleNetworkError("Fetching todo items failed.", error);
      this.retryRemoteCall(
        this.remoteFetchItems.bind(this),
        "fetch todo items request"
      );
    }
  }

  /**
   * Sync all items to the remote.
   * OBS! Is executed only if there is not pending retry for a request.
   * OBS! This request will automatically be repeated if it fails.
   */
  private async remoteSyncState() {
    try {
      await todoResource.syncState(this.todoLocalState);
    } catch (error) {
      this.handleNetworkError("Synching the state to remote failed.", error);
      this.retryRemoteCall(
        this.remoteSyncState.bind(this),
        "sync state request"
      );
    }
  }

  /**
   * Calls the provided method once after the retry time has passed.
   * @see timeToRetrySync
   */
  private retryRemoteCall(remoteCall: () => void, failedRequestName: string) {
    this.requestIsInRetryState = true;
    loggerService.logDebug(
      `Retrying failed ${failedRequestName} in ` +
        this.timeToRetrySync / 1000 +
        " seconds. "
    );
    setTimeout(() => {
      remoteCall();
      this.requestIsInRetryState = false;
    }, this.timeToRetrySync);
  }

  private showErrorToast(message: string) {
    toastService.showToast("error", "Error", message);
  }

  /** Handles error logging and shows a toast to the user when network request fails. */
  private handleNetworkError(message: string, error: any) {
    loggerService.logError(message, error);
    this.showErrorToast(message);
  }
}

export const todoService = new TodoService();
