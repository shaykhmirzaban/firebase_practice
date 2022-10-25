import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../config/FirebaseMethods";

export default function Signup() {
  let [currentV, setCurrentV] = useState({
    email: "",
    password: "",
    name: "",
  });
  let [err, setErr] = useState("");

  let navigate = useNavigate();

  const currentValue = (e) => {
    let { value, name } = e.target;

    setCurrentV((val) => {
      return { ...val, [name]: value };
    });
  };

  const signUpUser = (e) => {
    e.preventDefault();

    console.log(currentV);
    createNewUser(currentV)
      .then((_) => {
        alert(_);
        navigate("/");
      })
      .catch((_) => setErr(_));
  };

  return (
    <section className="SignUp">
      <div className="heading">
        <h1>Sign Up</h1>
      </div>
      <form action="" onSubmit={signUpUser}>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          onChange={currentValue}
        />
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={currentValue}
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={currentValue}
        />

        <button>Sign Up</button>
      </form>

      {err ? <p style={{ color: "red" }}>{err}</p> : null}

      <div className="switchUser">
        <br />
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </section>
  );
}
