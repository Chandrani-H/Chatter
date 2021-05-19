import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Chat from './Chat.js';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
          <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/chat">
          <Chat />
          </Route>
          <Route path="/">
            <Redirect to="/signin"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
