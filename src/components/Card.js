import React from "react";
import Tasks from "./Tasks";
import { Droppable } from "react-beautiful-dnd";

const Card = ({ title, tasks, handleTaskEdit, fetchTasks, setFetchTasks }) => {
  return (
    <Droppable key={title} droppableId={title}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={`card-title ${title} `}>
            <h2>{title}</h2>
          </div>
          <div className="card-content">
            <div className="tasks">
              <Tasks
                tasks={tasks}
                handleTaskEdit={handleTaskEdit}
                fetchTasks={fetchTasks}
                setFetchTasks={setFetchTasks}
              />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Card;
