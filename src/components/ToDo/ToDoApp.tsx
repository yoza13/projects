import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useStyles } from "../../useStyles";

interface ToDoItems {
  text: string;
}

export const ToDoApp: React.FC = () => {
  const [todoItems, setTodoItems] = React.useState<ToDoItems[]>([]);
  const [completeItems, setCompleteItems] = React.useState<string[]>([]);
  const [text, setText] = React.useState<string>("");
  const classes = useStyles();
  const handleCheck = (text: string) => {
    const updatedRespArray = completeItems.includes(text)
      ? completeItems.filter((o) => o !== text)
      : completeItems.concat(text);

    setCompleteItems(updatedRespArray);
  };
  return (
    <Container className={classes.appContainer}>
      <Card raised={true} className={classes.contentBox}>
        <CardHeader
          title="To Do App"
          subheader="Add or remove some items from list below and mark it if done"
        />
        <Stack
          sx={{ ml: 2, mr: 2, justifyContent: "space-between" }}
          direction="row"
        >
          <TextField
            type="text"
            placeholder="Add Todo..."
            value={text}
            sx={{ width: "80%" }}
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></TextField>
          <Button
            variant="contained"
            sx={{ width: "10%" }}
            onClick={() => {
              setTodoItems(todoItems.concat({ text: text }));
              setText("");
            }}
          >
            Submit
          </Button>
        </Stack>
        <Box sx={{ ml: 2 }}>
          <List>
            {todoItems?.map((items, index) => {
              const currentText = items.text;
              return (
                <ListItemButton key={items.text + index}>
                  <ListItemIcon onClick={() => handleCheck(currentText)}>
                    {completeItems.includes(currentText) ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={items.text}
                    sx={{
                      textDecoration: completeItems.includes(currentText)
                        ? "line-through"
                        : "none",
                    }}
                  />
                  <ListItemIcon
                    onClick={() => {
                      const newList = todoItems?.filter(
                        (newItems) => newItems.text !== currentText
                      );
                      setTodoItems(newList);
                    }}
                  >
                    <DeleteIcon />
                  </ListItemIcon>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Card>
    </Container>
  );
};
