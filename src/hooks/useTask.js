import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const HOST = process.env.REACT_APP_API_BASE_URL;

export function useTask(initialItems = []) {
  /*
   * Todo Items
   * dataType: array of object
   * properties: id: string, title: string
   */
  const [items, setItems] = useState(initialItems);
  /*
   * state of data load task
   * dataType: boolean
   */
  const [isLoadingFeatch, setIsLoadingFeatch] = useState(false);
  /*
   * state of data add task
   * dataType: boolean
   */
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  /*
   * state of data delete task
   * dataType: boolean
   */
  const [isLoadingDelete, setIsLoadingelete] = useState(false);
  /*
   * Error Handdle State
   * dataType: object
   * properties: status: boolean, message: string
   */
  const initErrorState = { status: false, message: "" };
  const [error, setError] = useState(initErrorState);

  /* istanbul ignore next */
  const handleError = (err) => {
    /* istanbul ignore next */
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setError({ status: true, message: err.response.data });
    } else if (err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      setError({ status: true, message: err.request });
    } else {
      // Something happened in setting up the request that triggered an Error
      setError({ status: true, message: err.message });
    }
  };

  // load item from server
  const loadItems = async () => {
    try {
      // -- Set loading on proccess
      setIsLoadingFeatch(true);
      // -- make a default value error data
      setError(initErrorState);
      const response = await fetch(`${HOST}/tasks`);
      const tasks = await response.json();

      setItems(tasks);
    } catch (err) {
      /* istanbul ignore next */
      handleError(err);
    } finally {
      // -- Set loading process already done
      setIsLoadingFeatch(false);
    }
  };

  // create a new item
  const addItem = async (title) => {
    try {
      // -- Set add on proccess
      setIsLoadingAdd(true);
      // -- make a default value error data
      setError(initErrorState);
      // -- make a unique id with hash string
      const idTask = uuidv4();
      // -- set create at date
      const CreateAt = dayjs(new Date()).format("DD MMM YYYY, HH:mm:ss");
      // -- set data post
      const newItem = { id: idTask, title, createAt: CreateAt };
      // -- post add process
      const response = await fetch(`${HOST}/tasks`, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      // -- update data items
      setItems([...items, newItem]);
    } catch (err) {
      /* istanbul ignore next */
      handleError(err);
    } finally {
      // -- Set add process already done
      setIsLoadingAdd(false);
    }
  };

  // delete an item
  const deleteItem = async (deletedItemId) => {
    try {
      // -- Set delete on proccess
      setIsLoadingelete(true);
      // -- make a default value error data
      setError(initErrorState);
      const response = await fetch(`${HOST}/tasks/${deletedItemId}`, {
        method: "DELETE",
      });
      await response.json();
      setItems((items) => items.filter((i) => i.id !== deletedItemId));
    } catch (err) {
      /* istanbul ignore next */
      handleError(err);
    } finally {
      // -- Set delete process already done
      setIsLoadingelete(false);
    }
  };

  return {
    error,
    items,
    isLoadingFeatch,
    isLoadingAdd,
    isLoadingDelete,
    addItem,
    deleteItem,
    loadItems,
  };
}
