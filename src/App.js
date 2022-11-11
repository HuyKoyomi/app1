import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Light from "./components/Light/Light";
import Pan from "./components/Pan/Pan";
import Gas from "./components/Gas/Gas";
import FormLogin from "./components/Home/FormLogin";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <Router>
        <Switch>
          <Route path="/" exact component={FormLogin} />
          <Route path="/Home" exact component={Home} />
          <Route path="/Light" exact component={Light} />
          <Route path="/Servo" exact component={Login} />
          <Route path="/Pan" exact component={Pan} />
          <Route path="/Register" exact component={Register} />
          <Route path="/Gas" exact component={Gas} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
