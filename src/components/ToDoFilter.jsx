function ToDoFilter({ darkMode, filterBy, onUpdateFilter }) {
  function getButtonStyles(btn) {
    return `${
      filterBy === `${btn}`
        ? "text-BrightBlue"
        : `${
            darkMode
              ? "text-DarkGrayishBlue2 hover:text-white"
              : "text-DarkGrayishBlue hover:text-VeryDarkGrayishBlue"
          }`
    }`;
  }

  return (
    <>
      <button
        className={` ${getButtonStyles("all")} `}
        onClick={() => onUpdateFilter("all")}
      >
        All
      </button>
      <button
        className={` ${getButtonStyles("active")} `}
        onClick={() => onUpdateFilter("active")}
      >
        Active
      </button>
      <button
        className={` ${getButtonStyles("complete")} `}
        onClick={() => onUpdateFilter("complete")}
      >
        Complete
      </button>
    </>
  );
}

export default ToDoFilter;
