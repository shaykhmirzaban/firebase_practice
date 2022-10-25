import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/FirebaseMethods";

export default function Login() {
  let [currentV, setCurrentV] = useState({
    email: "",
    password: "",
  });
  let [err, setErr] = useState("");

  let navigate = useNavigate();

  const currentValue = (e) => {
    let { value, name } = e.target;
    setCurrentV((val) => {
      return { ...val, [name]: value };
    });
  };

  const fieldValue = (e) => {
    e.preventDefault();

    console.log(currentV);
    loginUser(currentV)
      .then((_) => {console.log(_); navigate("/", {state: _})})
      .catch((_) => setErr(_));
  };

  return (
    <section className="login">
      <div className="heading">
        <h1>Login</h1>
      </div>

      <form action="" onSubmit={fieldValue}>
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

        <button>Login</button>
      </form>

        {err? <p style={{color: "red"}}>{err}</p> : null}
      <div className="switchPage">
        <br />
        <button onClick={() => navigate("/signup")}>Sign up</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </section>
  );
}
