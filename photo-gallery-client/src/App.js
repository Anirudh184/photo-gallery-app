import React from "react";
import NavBar from "./components/NavBar"; 

import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";
import HomePage from "./components/HomePage/HomePage";
import SingleUser from "./components/Users/SingleUser";
import UploadImages from './components/UploadImages/UploadImages';
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import "./css/style.css";

function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={HomePage}/>

          <PrivateRoute path="/upload-images" component={UploadImages} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/user/:id" component={SingleUser} />
          <PrivateRoute path="/users" component={Users} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;