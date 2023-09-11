import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";

const Card = ({ title, tasks, handleTaskEdit, fetchTasks, setFetchTasks }) => {
  return (
    <div className="card">
      <div className={`card-title ${title} `}>
        <h2>{title}</h2>
      </div>
      <div className="card-content">
        <div className="tasks">
          <Task
            tasks={tasks}
            handleTaskEdit={handleTaskEdit}
            fetchTasks={fetchTasks}
            setFetchTasks={setFetchTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
