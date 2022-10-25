import { useLocation, useNavigate } from "react-router-dom";
import { signOutUserC } from "../config/FirebaseMethods";

export default function Boilerplate() {
  let location = useLocation();
  let navigate = useNavigate();
  const data = location.state;
  console.log(data);

  const signOutUser = () => {
    signOutUserC();
    navigate("/");
  };
  return (
    <section className="Boilerplate">
      <h1>All button</h1>
        {data? <h3>Welcome to {data.name}</h3> : null}
      <br />
      {data ? (
        <div className="buttons">
          <button onClick={() => navigate("information", { state: data })}>
            Information Page
          </button>
          <br />
          <button onClick={signOutUser}>Sign out</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={() => navigate("signup")}>Sign Up</button>
          <br />
          <button onClick={() => navigate("login")}>Login</button>
        </div>
      )}
    </section>
  );
}
