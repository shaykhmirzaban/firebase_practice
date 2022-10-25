import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addItem,
  getItem,
  updateItem,
  deleteItem,
} from "../config/FirebaseMethods";

export default function Information() {
  let [currentV, setCurrentV] = useState({
    userName: "",
    fullName: "",
    phoneNumber: "",
    date: "",
  });
  let navigate = useNavigate();
  let location = useLocation();
  let data = location.state;

  const currentValue = (e) => {
    let { value, name } = e.target;
    setCurrentV((val) => {
      return { ...val, [name]: value };
    });
  };

  const dataDisplay = (e) => {
    console.log(currentV);
    if (e.target.className === "addItem") {
      console.log(e.target.className);
      addItem(currentV);
    } else if (e.target.className === "getData") {
      console.log(currentV);
      getItem(currentV)
        .then((response) => {
          setCurrentV(response);
          console.log(response);
        })
        .catch((_) => alert(_));
    } else if (e.target.className === "updateItem") {
      updateItem(currentV);
    } else if (e.target.className === "deleteItem") {
      deleteItem(currentV);
    }
  };

  // useEffect(() => {
  //   console.log("Main chal raha hon");
  //   setCurrentV(currentV);
  // }, [currentV]);

  return (
    <section className="information">
      <div className="topPart">
        <div className="heading">
          <h1>Information</h1>
        </div>

        <div className="info">
          <h2>Name: {data.name}</h2>
          <h2>Email: {data.email}</h2>
          <h2>Password: {data.password}</h2>
        </div>
      </div>
      <div className="bottomPart">
        <form action="">
          <input
            type="text"
            placeholder="user name"
            name="userName"
            value={currentV.userName}
            onChange={currentValue}
          />
          <input
            type="text"
            placeholder="full name"
            name="fullName"
            value={currentV.fullName}
            onChange={currentValue}
          />
          <input
            type="number"
            placeholder="Phone Number"
            name="phoneNumber"
            value={currentV.phoneNumber}
            onChange={currentValue}
          />
          <input
            type="date"
            value={currentV.date}
            name="date"
            onChange={currentValue}
          />
        </form>

        <div className="buttons">
          <button className="addItem" onClick={dataDisplay}>
            Add Data
          </button>
          <button className="getData" onClick={dataDisplay}>
            Get Data from DB
          </button>
          <button className="updateItem" onClick={dataDisplay}>
            Update Data
          </button>
          <button className="deleteItem" onClick={dataDisplay}>
            Delete Data
          </button>
        </div>
      </div>

      <br />
      <button onClick={() => navigate("/", { state: data })}>Go To Home</button>
    </section>
  );
}
