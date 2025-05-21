import { SubTask, Filter } from "@/model/types";

export function filterSubtasks(subtasks: SubTask[], filter: Filter): SubTask[] {
  switch (filter) {
    case "active":
      return subtasks.filter((s) => !s.completed);
    case "completed":
      return subtasks.filter((s) => s.completed);
    default:
      return subtasks;
  }
}
