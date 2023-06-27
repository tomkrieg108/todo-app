function ToDoFilter({ filterBy, onUpdateFilter }) {
  return (
    <>
      <button
        className={`${filterBy === "all" && "text-BrightBlue"}`}
        onClick={() => onUpdateFilter("all")}
      >
        All
      </button>
      <button
        className={`${filterBy === "active" && "text-BrightBlue"}`}
        onClick={() => onUpdateFilter("active")}
      >
        Active
      </button>
      <button
        className={`${filterBy === "complete" && "text-BrightBlue"}`}
        onClick={() => onUpdateFilter("complete")}
      >
        Complete
      </button>
    </>
  );
}

export default ToDoFilter;
