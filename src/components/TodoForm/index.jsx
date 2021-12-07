import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./index.scss";

/*
 * Components: TodoForm
 * Props: { isProcess: bool, onAdd: func }
 */

export default function TodoForm({ isProcess = false, onAdd }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const inputEl = useRef(null);

  // -- Handle Sumbit task
  const handleSubmit = (e) => {
    e.preventDefault();

    // -- trim space character
    const nameTask = value.trim();

    /* istanbul ignore next */
    if (nameTask.length > 160) {
      // -- validation maximum character is 160
      setError("Maximum of character task name 160 char");
      inputEl.current.focus();
    } else if (nameTask.length < 1) {
      // -- Validate empty value task
      setError("Task name can't empty!");
      inputEl.current.focus();
    } else {
      onAdd && onAdd(value);
      setValue("");
      setError("");
    }
    e.stopPropagation();
  };

  return (
    <header className="header">
      <h1 className="header__title">
        Task<span>Tracking</span> Application
      </h1>
      <p className="header__subtitle">A simple of task Tracking management - Goat Test</p>
      <form
        className={`todo-form ${error.length > 0 && "animate__animated animate__headShake"}`}
        onSubmit={handleSubmit}
      >
        <input
          className="todo-form__input-control"
          type="text"
          placeholder="Add a new task here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isProcess}
          ref={inputEl}
        />
        <button disabled={isProcess} className="todo-form__button" type="submit" role="submit">
          Add Task
        </button>
      </form>
      {error.length > 0 && <p className="todo-form__error animate__animated animate__fadeIn">{error}</p>}
    </header>
  );
}

TodoForm.propTypes = {
  isProcess: PropTypes.bool,
  onAdd: PropTypes.func,
};
