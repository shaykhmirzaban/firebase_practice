import { useState } from "react";

import {
  addItem,
  getItem,
  deleteItem12,
  updateItem12,
  deleteAllItem12,
} from "./config1/FirebaseMethods";

import "../style/todo.scss";

export default function Todo() {
  let [currentText, setCText] = useState("");
  let [list, setList] = useState([]);
  let [flag, setFlag] = useState(false);
  let [currentV, setCurrentV] = useState("");
  let [obj, setObj] = useState({});

  // input area
  const textFn = (e) => {
    let { value } = e.target;
    setCText(value);
  };

  // add item in database and array
  const addItems = () => {
    addItem(currentText);
    getItem().then((data) => {
      setList((val) => {
        return [...val, data];
      });
    });

    // empty area
    setCText("");

    // focus
    let addArea = document.querySelector(".addArea");
    addArea.focus();
  };

  // delete item
  const deleteItem = (id, ind) => {
    deleteItem12(id);
    setList((val) => {
      return val.filter((value, index) => {
        return index !== ind;
      });
    });
  };

  // item set but not updatfe
  const updateItem = (data, index) => {
    setObj({
      date: data.currentDate,
      uniqueIdentity: index,
    });
    setCurrentV(data.content);
    setFlag(true);
  };

  // repalce item (actucally item this function update)
  const replaceItem = () => {
    setFlag(false);
    updateItem12(obj.date, currentV);
    setList((val) => {
      return val.map((value, index) => {
        if (index === obj.uniqueIdentity) {
          return {
            ...value,
            content: currentV,
          };
        } else {
          return value;
        }
      });
    });
  };

  const deleteAllItem = () => {
    deleteAllItem12();
    setList([]);
  };

  return (
    <section className="todo">
      <h1>Todo</h1>

      <div className="textArea">
        <input
          type="text"
          value={currentText}
          onChange={textFn}
          className={"addArea"}
        />

        <button onClick={addItems}>add</button>
      </div>

      <ul>
        {list.map((value, index) => {
          return (
            <li key={index}>
              <p>{value.content}</p>
              <div className="buttons">
                <button onClick={() => deleteItem(value.currentDate, index)}>
                  Delete
                </button>
                <button onClick={() => updateItem(value, index)}>Update</button>
              </div>
            </li>
          );
        })}
      </ul>

      {flag ? (
        <div className="box">
          <div className="subBox">
            <input
              type="text"
              value={currentV}
              onChange={(e) => setCurrentV(e.target.value)}
            />
            <button onClick={replaceItem}>Replace</button>
          </div>
        </div>
      ) : null}

      {list.length > 3 ? (
        <button className="deleteAll" onClick={deleteAllItem}>
          Delete All
        </button>
      ) : null}
    </section>
  );
}
