export interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

export interface Task {
  id: number;
  text: string;
  subtasks: SubTask[];
  completed: boolean;
  filter: Filter;
}

export type Filter = "all" | "active" | "completed";

export interface State {
  tasks: Task[];
}

export type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "ADD_SUBTASK"; payload: { taskId: number; text: string } }
  | { type: "TOGGLE_SUBTASK"; payload: { taskId: number; subtaskId: number } }
  | { type: "DELETE_COMPLETED_SUBTASKS"; payload: { taskId: number } }
  | { type: "SET_FILTER"; payload: { taskId: number; filter: Filter } };
