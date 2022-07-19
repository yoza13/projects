import * as React from "react";
import {
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyles } from "../../useStyles";
import axios from "axios";

interface ToDoItems {
  Task: string;
  id: number;
}

export const ToDoApp: React.FC = () => {
  const [todoItems, setTodoItems] = React.useState<ToDoItems[]>([]);
  const [text, setText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const classes = useStyles();
  const deleteItem = async (id: number) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${process.env.TODO_ITEMS}?id=${id}`);
    setIsLoading(false);
    setTodoItems(
      data.body.Count === 0
        ? [{ id: "123", Task: "No Task Found" }]
        : data.body.Items
    );
  };
  const addItem = async (taskName: string) => {
    setIsLoading(true);
    const { data } = await axios.put(process.env.TODO_ITEMS, {
      taskName,
    });
    setIsLoading(false);
    setTodoItems(data.body.Items);
  };

  React.useEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      const { data } = await axios.get(process.env.TODO_ITEMS);
      setTodoItems(
        data.body.Count === 0
          ? [{ id: "123", Task: "No Task Found" }]
          : data.body.Items
      );
      setIsLoading(false);
    }
    getTasks();
  }, []);
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
            onClick={() => addItem(text)}
          >
            Submit
          </Button>
        </Stack>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Serial No.</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoItems?.map((items, index) => (
                <TableRow key={items.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{items.Task}</TableCell>
                  <TableCell onClick={() => deleteItem(items.id)}>
                    {items.Task === "No Task Found" ? (
                      <React.Fragment></React.Fragment>
                    ) : (
                      <DeleteIcon />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading && <CircularProgress aria-busy={true} size={100} />}
      </Card>
    </Container>
  );
};
