import React, { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([{
        id: crypto.randomUUID(),
        title: "Learn React",
        description: "Learning React is fun!",
        tags: ["javaScript", "react", "frontEnd"],
        priority: "medium",
        isFavorite: false
    }]);
  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <SearchTask />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions />
          <TaskLists tasks={tasks} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
