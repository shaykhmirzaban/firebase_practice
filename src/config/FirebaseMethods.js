import app from "./FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  update,
  remove,
} from "firebase/database";

const auth = getAuth(app);
let user;

function createNewUser({ email, password, name }) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentail) => {
        user = userCredentail.user;
        console.log(user);

        const db = getDatabase();
        set(ref(db, `users/${user.uid}`), {
          email: email,
          password: password,
          name: name,
        })
          .then((_) => resolve("Account is created successful"))
          .catch((_) => reject("Sorry something is wrong"));
      })
      .catch((error) => {
        console.log(error.code, error.message);
        reject(error.message);
      });
  });
}

function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        // ...
        const db = getDatabase();
        const starCountRef = ref(db, `users/${user.uid}`);
        onValue(starCountRef, (snapshot) => {
          let data_hy_ya_nahi = snapshot.exists();
          const data = snapshot.val();
          if (data_hy_ya_nahi) {
            resolve(data);
          } else {
            reject("data nahi hy");
          }
        });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function signOutUserC() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("sign-out successful");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
}

function addItem({ userName, fullName, phoneNumber, date }) {
  const data = getDatabase();
  const reference = ref(data, `users/${user.uid}/${userName}`);
  set(reference, {
    userName: userName,
    fullName: fullName,
    phoneNumber: phoneNumber,
    date: date,
  })
    .then(() => {
      console.log("Data is successful add");
    })
    .catch(() => console.log("Item is not add something is wrong"));
}

function getItem({ userName }) {
  console.log(userName);
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const reference = ref(db);
    console.log(reference);
    get(child(reference, `users/${user.uid}/${userName}`))
      .then((snapshot) => {
        console.log(snapshot);
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject("data is not available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updateItem({ userName, fullName, phoneNumber, date }) {
  const db = getDatabase();
  const reference = ref(db, `users/${user.uid}/${userName}`);
  update(reference, {
    fullName: fullName,
    phoneNumber: phoneNumber,
    date: date,
  })
    .then(() => alert("Data is successfuly update"))
    .catch(() => console.log("Data is not update"));
}

function deleteItem({ userName }) {
  const db = getDatabase();
  const reference = ref(db, `users/${user.uid}/${userName}`);
  remove(reference)
    .then(() => {
      alert("Item is successful delete");
    })
    .catch(() => console.log("something is wrong"));
}

export {
  createNewUser,
  loginUser,
  signOutUserC,
  addItem,
  updateItem,
  getItem,
  deleteItem,
};
