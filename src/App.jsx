import { useEffect } from "react";
import { useTask } from "./hooks/useTask";
import { toast } from "react-toastify";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

import "./App.scss";

export default function App() {
  const { items, isLoadingFeatch, isLoadingAdd, isLoadingDelete, addItem, deleteItem, loadItems, error } = useTask();

  useEffect(() => {
    // load tasks component didmount
    loadItems();
  }, []); // eslint-disable-line

  useEffect(() => {
    /* istanbul ignore next */
    if (error.status) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  return (
    <div className="layout">
      <div className="layout__container">
        <TodoForm isProcess={isLoadingAdd || isLoadingFeatch} onAdd={(data) => addItem(data)} />
        <TodoList onDelete={(id) => deleteItem(id)} isDelete={isLoadingDelete} isLoad={isLoadingFeatch} data={items} />
      </div>
    </div>
  );
}
