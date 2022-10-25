import app from "./FirebaseConfig1";
import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

const db = getDatabase(app);
let data;

function addItem(text) {
  data = new Date().getTime();

  set(ref(db, "users/" + data), {
    content: text,
    currentDate: data,
  });
}

function getItem() {
  return new Promise((resolve, reject) => {
    onValue(ref(db, `users/${data}`), (snapshort) => {
      if (snapshort.exists) {
        resolve(snapshort.val());
      } else {
        reject("data is not available");
      }
    });
  });
}

function deleteItem12(id) {
  remove(ref(db, `users/${id}`))
    .then(() => console.log("successfully deleted 👍"))
    .catch(() => console.log("Something wrong 🤔"));
}

function updateItem12(uid, text) {
  update(ref(db, `users/${uid}`), {
    currentDate: uid,
    content: text,
  })
    .then(() => console.log("Updated item successfully 😃"))
    .catch(() => {
      console.log("Something wrong 🤔");
    });
}

function deleteAllItem12() {
  remove(ref(db, "users"))
    .then(() => console.log("successfully deleted 👍"))
    .catch(() => console.log("Something wrong 🤔"));
}

export { addItem, getItem, deleteItem12, updateItem12, deleteAllItem12 };
