import React from "react";
import ToDoFilter from "./ToDoFilter";
import { getDisplayModeStyles } from "../utils/utils";

function ControlPanel({
  darkMode,
  todoList,
  filterBy,
  onUpdateFilter,
  onClearComplete,
}) {
  const getItemsLeft = function () {
    let count = 0;
    todoList.forEach((item) => {
      if (!item.completed) count++;
    });
    return count;
  };

  return (
    <>
      <div
        className={`flex justify-between items-center rounded-b-md py-5 px-6 text-sm shadow-xl ${getDisplayModeStyles(
          darkMode
        )}`}
      >
        <p>{`${getItemsLeft()} items left`}</p>

        <div className={`hidden md:flex justify-center items-center space-x-6`}>
          <ToDoFilter
            darkMode={darkMode}
            filterBy={filterBy}
            onUpdateFilter={onUpdateFilter}
          />
        </div>

        <button
          className={`${
            darkMode
              ? "text-DarkGrayishBlue2 hover:text-white"
              : "text-DarkGrayishBlue hover:text-VeryDarkGrayishBlue"
          }`}
          onClick={onClearComplete}
        >
          Clear complete
        </button>
      </div>

      <div
        className={`mt-10 py-5 rounded-md flex justify-center items-center space-x-12 text-lg md:hidden ${getDisplayModeStyles(
          darkMode
        )}`}
      >
        <ToDoFilter
          darkMode={darkMode}
          filterBy={filterBy}
          onUpdateFilter={onUpdateFilter}
        />
      </div>
    </>
  );
}

export default ControlPanel;
