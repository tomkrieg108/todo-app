import { useRef, useState } from "react";
import Form from "../components/Form";
import ToDoList from "../components/ToDoList";

function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [todoList, setTodoList] = useState([]);
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

  function handleToggleDisplayMode() {
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

  function handleDragLeave(item) {}

  return (
    <div
      className={`w-screen min-h-screen text-white pb-8 ${
        darkMode ? " bg-VeryDarkBlue " : "bg-VeryLightGrayishBlue"
      }`}
    >
      <div
        className={`banner flex flex-col items-center justify-center ${
          darkMode ? "banner-dark" : "banner-light"
        }`}
      >
        {/* Banner content  - titlebar &  form - the todolist will be positin absolute, relative to this */}
        <div className="w-144 max-w-full px-6">
          {/* Title Bar */}
          <div className="flex justify-between items-center w-full">
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-widest">TODO</h1>
            {/* Toggle light/darl mode */}
            <button onClick={handleToggleDisplayMode}>
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
          {/* Input form */}
          <Form onAddTodo={handleAddTodo} darkMode={darkMode} />
        </div>
      </div>

      {/* todo list */}
      <div className="flex flex-col justify-center items-center">
        <ToDoList
          todoList={todoList}
          darkMode={darkMode}
          onDeleteTodo={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
          onClearComplete={handleClearComplete}
          onDragstart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      </div>
    </div>
  );
}

export default HomePage;
