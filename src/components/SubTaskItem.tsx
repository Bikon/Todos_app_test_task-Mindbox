import {
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { SubTask } from "@/model/types";

interface Props {
  subtask: SubTask;
  onToggle: () => void;
}

export default function SubTaskItem({ subtask, onToggle }: Props) {
  return (
    <Card>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={<Checkbox checked={subtask.completed} onChange={onToggle} />}
          label={
            <Typography
              sx={{
                textDecoration: subtask.completed ? "line-through" : "none",
                opacity: subtask.completed ? 0.6 : 1,
              }}
            >
              {subtask.text}
            </Typography>
          }
        />
      </CardContent>
    </Card>
  );
}
