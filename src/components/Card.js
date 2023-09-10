import React from "react";
import Task from "./Task";
import { useDrop } from "react-dnd";

const Card = ({ onDrop, title, tasks, handleTaskEdit }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: onDrop,
  });
  return (
    <div
      className="card"
      ref={drop}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        margin: "8px",
      }}
    >
      <div className={`card-title ${title} `}>
        <h2>{title}</h2>
      </div>
      <div className="card-content">
        <div className="tasks">
          <Task tasks={tasks} handleTaskEdit={handleTaskEdit} />
        </div>
      </div>
    </div>
  );
};

export default Card;
