import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Card from "./Card";
import axios from "axios";
import { toast } from "react-toastify";

const Cards = () => {
  const [tasks, setTasks] = useState();
  const [fetchTasks, setFetchTasks] = useState(true);
  const [editTaskId, setEditTaskId] = useState();
  const [task, setTask] = useState({
    name: "",
    status: "Todo",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function clearState() {
    setTask({
      name: "",
      status: "",
    });
  }
  function handleSubmit() {
    const id = toast.loading("Please wait...");
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/task/create`, task)
      .then((res) => {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        clearState();
        setFetchTasks(true);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.messages[0]);
      });
  }

  useEffect(() => {
    if (fetchTasks) {
      const fetchData = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/task/tasks`
        );

        setTasks(response.data.tasks);
      };
      fetchData();
      setFetchTasks(false);
    }
  }, [fetchTasks, setFetchTasks]);

  function filterTasksByStatus(status) {
    if (tasks) {
      return tasks.filter((obj) => obj.status === status);
    }
  }
  async function handleTaskEdit(editing, id) {
    if (editing) {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/task`, {
          params: { id: id },
        })
        .then((response) => {
          setTask(response.data.task);
        });
      setEditTaskId(id);
    }
  }

  const onDragEnd = async (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      let data = {
        status: result.destination.droppableId,
      };
      await axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/task/update`, data, {
          params: { _id: result.draggableId },
        })
        .then((response) => {
          setFetchTasks(true);
          toast.success(response.data.message);
        });
    }
  };

  async function handleUpdate() {
    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/task/update`, task, {
        params: { _id: editTaskId },
      })
      .then((response) => {
        toast.success(response.data.message);
        setFetchTasks(true);
        clearState();
        setEditTaskId("");
        // window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.messages[0]);
      });
  }
  function handleClick(e) {
    e.preventDefault();
    if (editTaskId) {
      handleUpdate();
    } else {
      handleSubmit();
    }
  }

  return (
    <main>
      <div className="add-task">
        <div className="add-task">
          <h2 className="add-task-header">
            {editTaskId ? "Update Task" : "Add a Task"}
          </h2>
          <form className="add-task-container">
            <div className="form-inp">
              <label htmlFor="task-name" className="form-label">
                Task
              </label>
              <input
                name="name"
                type="text"
                placeholder="Add a task"
                value={task.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="form-inp">
              <label htmlFor="task-status" className="form-label">
                Status
              </label>
              <select value={task.status} onChange={handleChange} name="status">
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <p>
              <input
                type="submit"
                value={editTaskId ? "Update" : "Add"}
                onClick={handleClick}
              />
            </p>
          </form>
        </div>
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className="cards">
          <div className="cards-container">
            <Card
              title="Todo"
              tasks={filterTasksByStatus("Todo")}
              handleTaskEdit={handleTaskEdit}
              fetchTasks={fetchTasks}
              setFetchTasks={setFetchTasks}
            />
            <Card
              title="Doing"
              tasks={filterTasksByStatus("Doing")}
              handleTaskEdit={handleTaskEdit}
              fetchTasks={fetchTasks}
              setFetchTasks={setFetchTasks}
            />
            <Card
              title="Done"
              tasks={filterTasksByStatus("Done")}
              handleTaskEdit={handleTaskEdit}
              fetchTasks={fetchTasks}
              setFetchTasks={setFetchTasks}
            />
          </div>
        </div>
      </DragDropContext>
    </main>
  );
};

export default Cards;
