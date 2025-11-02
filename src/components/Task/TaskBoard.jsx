import React, { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
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
      setTaskToUpdate(null)
    }
    setShowModal(false);

  }
  const handleEdit = (task) => {
    setTaskToUpdate(task)
    setShowModal(true)
  }
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const handleDeleteAllTasks = () => {
    setTasks([])
  }
  const handleClose = () => {
    setShowModal(false)
    setTaskToUpdate(null)
  }
  const handleSearch = (searchTerm) => {
    const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setTasks(filteredTasks)
  }
  const handleAddTaskToFavorite = (id) => {
    setTasks(tasks.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          isFavorite: !task.isFavorite
        }
      }
      return task
    }))
  }
  return (
    <section className="mb-20" id="tasks">
      {showModal && <AddTaskModal onAddTask={handleAddTask} taskToUpdate={taskToUpdate} onCloseClick={handleClose} />}
      <div className="container">
        <SearchTask onSearch={handleSearch} />
        <TaskActions onShowModal={() => setShowModal(true)} onDeleteAllTasks={handleDeleteAllTasks} />
        {
          tasks.length > 0 ?
            <TaskLists tasks={tasks} onEdit={handleEdit} onDelete={handleDeleteTask}
              onAddFavorite={handleAddTaskToFavorite} />
            :
            <NoTasksFound />
        }
      </div>
    </section>
  );
};

export default TaskBoard;
