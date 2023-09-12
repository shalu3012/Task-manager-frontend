import React, { useState } from "react";
import axios from "axios";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

const Tasks = ({ id, tasks, handleTaskEdit, fetchTasks, setFetchTasks }) => {
  const [editing, setEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(0);

  async function deleteTask(id) {
    const message = toast.loading("Please wait...");
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/task/delete`, {
        params: { _id: id },
      })
      .then((res) => {
        toast.update(message, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setFetchTasks(true);
      });
  }

  async function handleEdit(id) {
    setEditing(true);
    handleTaskEdit(editing, id);
  }
  return (
    <main>
      <div className="tasks">
        {tasks &&
          tasks.map((task, index) => (
            <Task
              index={index}
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              handleEdit={handleEdit}
            />
          ))}
      </div>
    </main>
  );
};

export default Tasks;
