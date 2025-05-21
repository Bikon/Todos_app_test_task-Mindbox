import { useReducer, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import TaskAccordion from "@/components/TaskAccordion";
import { reducer } from "@/model/reducer";
import { State } from "@/model/types";

export default function ToDoApp() {
  const [state, dispatch] = useReducer(reducer, { tasks: [] } as State);
  const [taskText, setTaskText] = useState("");

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        ToDo-приложение
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Новая задача..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && taskText.trim()) {
              dispatch({ type: "ADD_TASK", payload: taskText.trim() });
              setTaskText("");
            }
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (taskText.trim()) {
              dispatch({ type: "ADD_TASK", payload: taskText.trim() });
              setTaskText("");
            }
          }}
        >
          Добавить
        </Button>
      </Stack>

      <Stack spacing={2}>
        {state.tasks.map((task) => (
          <TaskAccordion key={task.id} task={task} dispatch={dispatch} />
        ))}
      </Stack>
    </Container>
  );
}
