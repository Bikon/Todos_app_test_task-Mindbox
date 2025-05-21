import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Task, Action, Filter } from "@/model/types";
import { filterSubtasks } from "@/utils/filterSubtasks";
import SubTaskItem from "./SubTaskItem";

interface Props {
  task: Task;
  dispatch: React.Dispatch<Action>;
}

export default function TaskAccordion({ task, dispatch }: Props) {
  const [newSubtask, setNewSubtask] = useState("");

  const filtered = filterSubtasks(task.subtasks, task.filter);
  const remaining = task.subtasks.filter((s) => !s.completed).length;

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ flexGrow: 1 }}>{task.text}</Typography>
        <Typography color="text.secondary">Осталось: {remaining}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <ToggleButtonGroup
              value={task.filter}
              exclusive
              size="small"
              onChange={(_, val) =>
                dispatch({ type: "SET_FILTER", payload: { taskId: task.id, filter: val as Filter } })
              }
            >
              <ToggleButton value="all">Все</ToggleButton>
              <ToggleButton value="active">Невыполненные</ToggleButton>
              <ToggleButton value="completed">Выполненные</ToggleButton>
            </ToggleButtonGroup>
            <Button
              color="error"
              variant="outlined"
              onClick={() => dispatch({ type: "DELETE_COMPLETED_SUBTASKS", payload: { taskId: task.id } })}
            >
              Удалить выполненные
            </Button>
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Новая подзадача..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => {
                const trimmed = newSubtask.trim();
                if (e.key === "Enter" && trimmed) {
                  dispatch({ type: "ADD_SUBTASK", payload: { taskId: task.id, text: trimmed } });
                  setNewSubtask("");
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                const trimmed = newSubtask.trim();
                if (trimmed) {
                  dispatch({ type: "ADD_SUBTASK", payload: { taskId: task.id, text: trimmed } });
                  setNewSubtask("");
                }
              }}
            >
              Добавить
            </Button>
          </Stack>

          {filtered.map((subtask) => (
            <SubTaskItem
              key={subtask.id}
              subtask={subtask}
              onToggle={() =>
                dispatch({ type: "TOGGLE_SUBTASK", payload: { taskId: task.id, subtaskId: subtask.id } })
              }
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
