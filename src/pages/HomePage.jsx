import { useRef, useState } from "react";
import Form from "../components/Form";
import ToDoItem from "../components/ToDoItem";
import ControlPanel from "../components/ControlPanel";
import { getDisplayModeStyles } from "../utils/utils";

function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const draggedItem = useRef(null);

  function swapItems(draggedItemId, dragEnterItemId) {
    //get indicies of the items to swap
    let i1 = null;
    let i2 = null;
    todoList.forEach((el, i) => {
      i1 = el.id === draggedItemId ? i : i1;
      i2 = el.id === dragEnterItemId ? i : i2;
    });
    if (i1 === null || i2 === null) return;
    // swap the items
    let newList = todoList.slice();
    [newList[i1], newList[i2]] = [newList[i2], newList[i1]];
    setTodoList((todoList) => {
      return newList;
    });
  }

  function handleToggleDarkMode() {
    setDarkMode((darkMode) => {
      return !darkMode;
    });
  }

  function handleAddTodo(todo) {
    setTodoList((todoList) => [...todoList, todo]);
  }
  function handleDeleteTodo(id) {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
  }

  function handleToggleComplete(id) {
    setTodoList((todoList) =>
      todoList.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  }

  const handleUpdateFilter = function (val) {
    setFilterBy(val);
  };

  function handleClearComplete() {
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete all completed items?"
    // );
    const confirmed = true;
    if (confirmed) {
      setTodoList((todoList) => todoList.filter((item) => !item.completed));
    }
  }

  function handleDragStart(item) {
    draggedItem.current = item;
  }

  function handleDragEnd(item) {
    draggedItem.current = null;
  }

  function handleDragEnter(item) {
    if (item.id !== draggedItem.current.id) {
      swapItems(draggedItem.current.id, item.id);
    }
  }

  return (
    <Main darkMode={darkMode}>
      <Banner darkMode={darkMode}>
        <TitleBar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
        <Form darkMode={darkMode} onAddTodo={handleAddTodo} />
      </Banner>

      <ListBox>
        <ToDoList darkMode={darkMode} todoList={todoList}>
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
                  key={item.id}
                  item={item}
                  darkMode={darkMode}
                  onDeleteTodo={handleDeleteTodo}
                  onToggleComplete={handleToggleComplete}
                  onDragstart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragEnter={handleDragEnter}
                />
              );
            })}
        </ToDoList>
        <ControlPanel
          darkMode={darkMode}
          todoList={todoList}
          filterBy={filterBy}
          onUpdateFilter={handleUpdateFilter}
          onClearComplete={handleClearComplete}
        />
      </ListBox>
    </Main>
  );
}

function Main({ darkMode, children }) {
  return (
    <main
      className={`w-screen min-h-screen text-white pb-8 ${
        darkMode ? " bg-VeryDarkBlue " : "bg-VeryLightGrayishBlue"
      }`}
    >
      {children}

      <p
        className={`mt-1 text-center ${
          darkMode ? "text-DarkGrayishBlue2" : "text-VeryDarkGrayishBlue"
        }`}
      >
        Drag and drop to reorder list
      </p>
    </main>
  );
}

function Banner({ darkMode, children }) {
  return (
    <div
      className={`banner flex flex-col items-center justify-center ${
        darkMode ? "banner-dark" : "banner-light"
      }`}
    >
      {/* Banner content */}
      <div className="w-144 max-w-full px-6">{children}</div>
    </div>
  );
}

function TitleBar({ darkMode, onToggleDarkMode }) {
  return (
    <div className="flex justify-between items-center w-full">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-widest">TODO</h1>
      {/* Toggle light/darl mode */}
      <button onClick={onToggleDarkMode}>
        {/* Sun - display when in dark mode */}
        <svg
          className={darkMode ? "" : "hidden"}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
          />
        </svg>

        {/* Moon - display when in light mode */}
        <svg
          className={darkMode ? "hidden" : ""}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
          />
        </svg>
      </button>
    </div>
  );
}

function ListBox({ children }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={`w-144 max-w-full px-6 -translate-y-12 text-lg`}>
        {children}
      </div>
    </div>
  );
}

function ToDoList({ darkMode, children }) {
  return (
    <ul className={`shadow-xl rounded-t-md ${getDisplayModeStyles(darkMode)}`}>
      {children}
    </ul>
  );
}

export default HomePage;
