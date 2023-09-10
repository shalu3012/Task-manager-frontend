import React, { useState } from "react";
import axios from "axios";
import { useDrag } from "react-dnd";

const Task = ({ id, tasks, handleTaskEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(0);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  async function deleteTask(id) {
    axios
      .delete("http://localhost:5000/api/task/delete", { params: { _id: id } })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      });
  }

  async function handleEdit(id) {
    setEditing(true);
    handleTaskEdit(editing, id);
  }
  return (
    <main>
      {tasks &&
        tasks.map((task) => (
          <div
            className="task-container"
            key={task._id}
            ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
              cursor: "move",
              border: "1px solid #ccc",
              marginBottom: "8px",
              padding: "8px",
            }}
          >
            <div className="task">
              <div className="task-title">
                <p className="title">{task.name}</p>
              </div>
              {/* <div className="task-content">{taskContent}</div> */}
            </div>
            <div className="task-actions">
              <div className="edit-task" onClick={() => handleEdit(task._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="25"
                >
                  <path d="M188.5-186.427h44.811l408.263-408.662-44.812-44.811L188.5-231.238v44.811Zm598.964-456.422L644.429-785.298l41.086-41.325q21.87-21.949 53.29-22.069 31.42-.12 53.369 21.59l41.065 41.065q20.594 20.276 20.29 48.852-.304 28.576-20.101 48.373l-45.964 45.963Zm-47.094 47.427-478.61 478.61H118.645v-143.035l478.451-478.451L740.37-595.422Zm-120.963-22.072L596.762-639.9l44.812 44.811-22.167-22.405Z" />
                </svg>
              </div>

              <div className="delete-task" onClick={() => deleteTask(task._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="25"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export default Task;