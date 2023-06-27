import { useState } from "react";
import ToDoItem from "./ToDoItem";
import ToDoFilter from "./ToDoFilter";
import { getDisplayModeStyles } from "../utils/utils";

export default function ToDoList({
  todoList,
  darkMode,
  onDeleteTodo,
  onToggleComplete,
  onClearComplete,
}) {
  const [filterBy, setFilterBy] = useState("all");

  const handleUpdateFilter = function (val) {
    setFilterBy(val);
  };

  const getItemsLeft = function () {
    let count = 0;
    todoList.forEach((item) => {
      if (!item.completed) count++;
    });
    return count;
  };

  return (
    <div className={`w-144 max-w-full px-6 -translate-y-12 text-lg`}>
      <ul
        className={`shadow-xl rounded-t-md ${getDisplayModeStyles(darkMode)}`}
      >
        {todoList
          .filter((item) => {
            return (
              filterBy === "all" ||
              (filterBy === "active" && !item.completed) ||
              (filterBy === "complete" && item.completed)
            );
          })
          .map((item) => {
            return (
              <ToDoItem
                item={item}
                key={item.id}
                darkMode={darkMode}
                onDeleteTodo={onDeleteTodo}
                onToggleComplete={onToggleComplete}
              />
            );
          })}
      </ul>

      {/* items left and clear items */}
      <div
        className={`flex justify-between items-center rounded-b-md py-5 px-6 text-sm shadow-xl ${getDisplayModeStyles(
          darkMode
        )}`}
      >
        <p>{`${getItemsLeft()} items left`}</p>

        {/* filters - could make this button a seperate component.  make use of the 'children' prop? */}
        <div className={`hidden md:flex justify-center items-center space-x-6`}>
          <ToDoFilter filterBy={filterBy} onUpdateFilter={handleUpdateFilter} />
        </div>

        <button onClick={onClearComplete}>Clear complete</button>
      </div>

      {/* Filter */}
      <div
        className={`mt-10 py-5 rounded-md flex justify-center items-center space-x-12 text-lg md:hidden ${getDisplayModeStyles(
          darkMode
        )}`}
      >
        <ToDoFilter filterBy={filterBy} onUpdateFilter={handleUpdateFilter} />
      </div>

      <p
        className={`mt-10 text-center ${
          darkMode ? "text-DarkGrayishBlue2" : "text-VeryDarkGrayishBlue"
        }`}
      >
        Drag and drop to reorder list
      </p>
    </div>
  );
}
