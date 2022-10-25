import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
// import Boilerplate from "./screen/Boilerplate.jsx";
// import Signup from "./screen/Signup.jsx";
// import Login from "./screen/Login.jsx";
// import Information from "./screen/Information.jsx";
import Todo from "./components/Todo.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} />
        {/* <Route path="signUp" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="information" element={<Information />} /> */}
      </Routes>
    </Router>
  );
}
