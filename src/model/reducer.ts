import { State, Action } from "./types";

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_TASK": {
            const newTask = {
                id: Date.now(),
                text: action.payload,
                subtasks: [],
                completed: false,
                filter: "all",
            };
            return { tasks: [...state.tasks, newTask] };
        }

        case "ADD_SUBTASK":
            return {
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return {
                            ...task,
                            subtasks: [
                                ...task.subtasks,
                                { id: Date.now(), text: action.payload.text, completed: false },
                            ],
                            completed: false,
                        };
                    }
                    return task;
                }),
            };

        case "TOGGLE_SUBTASK":
            return {
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        const subtasks = task.subtasks.map((s) =>
                            s.id === action.payload.subtaskId
                                ? { ...s, completed: !s.completed }
                                : s
                        );
                        const completed = subtasks.every((s) => s.completed);
                        return { ...task, subtasks, completed };
                    }
                    return task;
                }),
            };

        case "DELETE_COMPLETED_SUBTASKS":
            return {
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        const remaining = task.subtasks.filter((s) => !s.completed);
                        return {
                            ...task,
                            subtasks: remaining,
                            completed: remaining.length === 0,
                        };
                    }
                    return task;
                }),
            };

        case "SET_FILTER":
            return {
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, filter: action.payload.filter }
                        : task
                ),
            };

        default:
            return state;
    }
}
