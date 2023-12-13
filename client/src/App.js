import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Detail from "./components/Detail/Detail";
import Landing from "./components/Landing/Landing";
import { Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_FETCH_BASE_URL;

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path={"/"} component={Landing} />
      <Route path={"/home"} component={Home} />
      <Route exact path={"/addgame"} component={Form} />
      <Route exact path={"/detail/:id"} component={Detail} />
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
