export interface ITodoItem {
  id: number;
  text: string;
  done: boolean;
  // UI related states
  openInEditState?: boolean;
}
