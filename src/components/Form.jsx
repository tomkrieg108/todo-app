import { useState } from "react";
import { getDisplayModeStyles } from "../utils/utils";

function Form({ onAddTodo, darkMode }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const todo = {
      description,
      completed: false,
      id: Date.now(),
    };
    onAddTodo(todo);

    setDescription("");
  }

  return (
    <div
      className={`w-full mt-8 py-5 px-6 flex justify-center items-center space-x-6 rounded-md ${getDisplayModeStyles(
        darkMode
      )}`}
    >
      <div
        className={`chkbox ${darkMode ? "chkbox-dark" : "chkbox-light"}`}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex justify-center items-center space-x-6 "
      >
        <input
          type="text"
          placeholder="Create a new to-do..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full h-full text-xl tracking-wide outline-none bg-inherit`}
        />
      </form>
    </div>
  );
}

export default Form;
