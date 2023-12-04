import React, { useState } from "react";
import AddModal from "./AddModal.jsx";
import ListItem from "./Item.jsx";
import Empty from "./Empty.jsx";

const Todo = ({onFormSubmit}) => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "note",
      isChecked: false,
      isShown: true,
      status: "incomplete",
    },
    {
      id: 2,
      name: "note",
      isChecked: false,
      isShown: true,
      status: "incomplete",
    },
    {
      id: 3,
      name: "note",
      isChecked: false,
      isShown: true,
      status: "incomplete",
    },
  ]);

  const [statusTasks, setStatusTasks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (status) => {
    setSelectedOption(status);
  };

  const applyFilter = () => {
    switch (selectedOption) {
      case "complete":
        return tasks.filter((task) => task.isChecked);
      case "incomplete":
        return tasks.filter((task) => !task.isChecked);
      default:
        return tasks;
    }
  };

  const filteredTasks = applyFilter();

  const modalToggle = () => {
    setToggle(!toggle);
    document.body.classList.toggle("background");
  };

  const themeToggle = () => {
    document.body.classList.toggle("black-theme");
  };

  const checkToggle = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isChecked: !task.isChecked };
        }
        return task;
      });
    });
  };

  const searchTask = () => {
    const filteredTasks = tasks.map((task) => ({
      ...task,
      isShown: task.name.toLowerCase().includes(searchValue.toLowerCase()),
    }));
    setTasks(filteredTasks);
  };

  const addTask = () => {
    if (value !== "") {
      setTasks([
        ...tasks,
        {
          id: tasks[tasks.length - 1].id + 1,
          name: value,
          isChecked: false,
          isShown: true,
          status: "incomplete",
        },
      ]);
      setToggle(false);
      document.body.classList.toggle("background");
      setValue("");
    } else {
      window.alert("Please enter the task");
    }
  };

  return (
    <div className="container">
      <div className="header-box">
        <div className="title-box">
          <h2>todo list</h2>
        </div>
        <div className="input-box">
          <div className="search-box">
            <input
              type="text"
              className="search"
              placeholder="Search note..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <img src="/images/search.svg" alt="" onClick={() => searchTask()} />
          </div>
          <div className="dropdown">
            <button className="selection" onClick={toggleDropdown}>
              <p>{selectedOption}</p>
              <img src="/images/selection.svg" alt="" className="btn-icon" />
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <div onClick={() => handleOptionClick("all")}>all</div>
                <div onClick={() => handleOptionClick("complete")}>complete</div>
                <div onClick={() => handleOptionClick("incomplete")}>incomplete</div>
              </div>
            )}
          </div>
          <button className="theme-toggle" onClick={() => themeToggle()}>
            <img src="/images/day.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="tasks-box">
        {filteredTasks
          .filter((task) => task.isShown)
          .map((task, index) => (
            <ListItem
              task={task.name}
              tasks={tasks}
              index={index}
              id={task.id}
              key={index}
              isChecked={task.isChecked}
              checkToggle={checkToggle}
              onFormSubmit={onFormSubmit}
            />
          ))}
        {filteredTasks.filter((task) => task.isShown).length === 0 && <Empty />}
      </div>
      <button className="add-btn" onClick={() => modalToggle()}>
        <img src="/images/add.svg" alt="" className="add"/>
      </button>
      <AddModal
        isToggled={toggle}
        modalToggle={modalToggle}
        value={value}
        setValue={setValue}
        addTask={addTask}
        tasks={tasks}
        onFormSubmit={onFormSubmit}
      />
    </div>
  );
};

export default Todo;
