import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import axios from "axios";

const Cards = () => {
  console.log(process.env.REACT_APP_SERVER_URL);
  const [tasks, setTasks] = useState();
  const [editTaskId, setEditTaskId] = useState();
  const [task, setTask] = useState({
    name: "",
    status: "",
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
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/task/create`, task)
      .then((res) => {
        alert(res.data.message);
        clearState();
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.messages[0]);
      });
  }

  useEffect(() => {
    async function fetchTasks() {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/task/tasks`)
        .then((response) => {
          setTasks(response.data.tasks);
        });
    }

    fetchTasks();
  }, []);

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

  async function handleUpdate() {
    console.log("inside handle update");
    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/task/update`, task, {
        params: { _id: editTaskId },
      })
      .then((response) => {
        alert(response.data.message);
        clearState();
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.messages[0]);
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

  const handleDrop = (taskId, newCategory) => {
    console.log(taskId);
    console.log(newCategory);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, category: newCategory } : task
      )
    );
  };

  return (
    <main>
      <div className="add-task">
        <div className="add-task">
          <h2 className="add-task-header">Add task</h2>
          <form className="add-task-container">
            <p>
              <input
                name="name"
                type="text"
                placeholder="Add a task"
                value={task.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </p>

            <select value={task.status} onChange={handleChange} name="status">
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>

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
      <DndProvider backend={HTML5Backend}>
        <div className="cards">
          <div className="cards-container">
            <Card
              title="To-do"
              tasks={filterTasksByStatus("Todo")}
              handleTaskEdit={handleTaskEdit}
              onDrop={(taskId) => handleDrop(taskId, "todo")}
            />
            <Card
              title="Doing"
              tasks={filterTasksByStatus("Doing")}
              handleTaskEdit={handleTaskEdit}
              onDrop={(taskId) => handleDrop(taskId, "todo")}
            />
            <Card
              title="Done"
              tasks={filterTasksByStatus("Done")}
              handleTaskEdit={handleTaskEdit}
              onDrop={(taskId) => handleDrop(taskId, "todo")}
            />
          </div>
        </div>
      </DndProvider>
    </main>
  );
};

export default Cards;
