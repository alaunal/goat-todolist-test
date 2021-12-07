import PropTypes from "prop-types";
import { BsX } from "react-icons/bs";

import itemsEmpty from "../../assets/itemEmpty.svg";

import "./index.scss";

/*
 * Components: TodoList
 * Props: { isDelete: bool, isLoad: bool, onDelete: func, data: arrayOf }
 */

export default function TodoList({ onDelete, isDelete = false, isLoad = false, data }) {
  return (
    <div className="list-items">
      {isLoad ? (
        <>
          <div className="placeholder" role="placeholder">
            <div className="animated-background"></div>
          </div>
          <div className="placeholder" role="placeholder">
            <div className="animated-background"></div>
          </div>
        </>
      ) : data.length < 1 ? (
        <div className="list-items__empty animate__animated animate__fadeIn">
          <img src={itemsEmpty} alt="illlustration empty" />
          <p>Task not available!</p>
        </div>
      ) : (
        <>
          {data.map(({ id, title, createAt }) => (
            <div className="item animate__animated animate__flipInX" key={id}>
              <div className="item__task" role="item__task">
                <h2>{title}</h2>
                <p>{createAt}</p>
              </div>
              <div>
                <button
                  disabled={isDelete}
                  className="item__action"
                  type="button"
                  onClick={() => onDelete(id)}
                  role="delete"
                >
                  <BsX />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  isDelete: PropTypes.bool,
  isLoad: PropTypes.bool,
};
