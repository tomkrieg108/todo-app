// import { useState } from "react";

function ToDoItem({
  item,
  darkMode,
  onDeleteTodo,
  onToggleComplete,
  onDragstart,
  onDragEnd,
  onDragEnter,
  onDragLeave,
}) {
  // const [dragState, setDragState] = useState(null);

  const setDragStyle = function () {
    // if (dragState === "start") return "bg-white";
    return "";
  };

  return (
    <div>
      <li
        onDragStart={() => {
          // setDragState("start");
          onDragstart(item);
          // console.log(`Drag start on: ${item.description}`);
        }}
        onDragEnd={() => {
          // setDragState("end");
          onDragEnd(item);
          // console.log(`Drag end on: ${item.description}`);
        }}
        onDragOver={(e) => {
          e.preventDefault(); //need this to allow it to receive drop events
          //console.log(`Drag over on: ${item.description}`);
        }}
        onDragEnter={(e) => {
          e.preventDefault(); //Don't think this is needed
          // setDragState("enter");
          onDragEnter(item);
          // console.log(`Drag enter on: ${item.description}`);
        }}
        onDragLeave={() => {
          // setDragState("leave");
          onDragLeave(item);
          // console.log(`Drag leave on: ${item.description}`);
        }}
        onDrop={() => {
          // setDragState("drop");
          // console.log(`Drag Drop on: ${item.description}`);
        }}
        draggable="true"
        className={`group py-5 px-6  border-b  w-full flex justify-between items-center first:rounded-t-md ${
          darkMode
            ? "border-VeryDarkGrayishBlue2 bg-inherit"
            : "border-LightGrayishBlue bg-inherit"
        } ${setDragStyle()} `}
      >
        <div className="flex justify-center items-center space-x-6">
          <div
            onClick={() => onToggleComplete(item.id)}
            className={`relative ${
              item.completed
                ? "chkbox-filled"
                : "chkbox  group-hover:chkbox-hover"
            }  ${
              darkMode &&
              !item.completed &&
              "chkbox-dark group-hover:chkbox-hover-dark"
            } ${
              !darkMode &&
              !item.completed &&
              "chkbox-light group-hover:chkbox-hover-light"
            }`}
          >
            {/* tick icon */}
            <svg
              className={`center-abs  ${!item.completed && "hidden"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
            >
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </div>
          <p
            className={`font-light tracking-wide ${
              item.completed && darkMode && "line-through text-DarkGrayishBlue2"
            } ${
              item.completed &&
              !darkMode &&
              "line-through text-LightGrayishBlue"
            }`}
          >
            {item.description}
          </p>
        </div>

        <button
          onClick={() => onDeleteTodo(item.id)}
          className="invisible group-hover:visible"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fillRule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </button>
      </li>
    </div>
  );
}

export default ToDoItem;
