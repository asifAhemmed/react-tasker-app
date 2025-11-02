import React, { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";
import AddTaskModal from "./AddTaskModal";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([{
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "Learning React is fun!",
    tags: ["javaScript", "react", "frontEnd"],
    priority: "medium",
    isFavorite: false
  }]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null)

  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([
        ...tasks,
        newTask
      ])
    } else {
      setTasks(tasks.map((task) => {
        if (task.id == newTask.id) {
          return newTask
        }
        return task
      }))

    }
    setShowModal(false);

  }
  const handleEdit = (task) => {
    setTaskToUpdate(task)
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
    setTaskToUpdate(null)
  }
  return (
    <section className="mb-20" id="tasks">
      {showModal && <AddTaskModal onAddTask={handleAddTask} taskToUpdate={taskToUpdate} onCloseClick={handleClose} />}
      <div className="container">
        <SearchTask />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onShowModal={() => setShowModal(true)} />
          <TaskLists tasks={tasks} onEdit={handleEdit} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
