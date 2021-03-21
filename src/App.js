import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Header from './components/Header/Header';
import RaiderOption from './components/RaiderOption/RaiderOption';
import Destination from './components/NavList/Destination/Destination';
import LogInBtn from './components/LogIn/LogInBtn';
import Blog from './components/NavList/Blog/Blog';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Details from './components/Details/Details';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [user, setUser] = useState({})
  return (
    <div className="body">
      <userContext.Provider value={[loggedInUser, setLoggedInUser], [user, setUser]}>
        <Router>
          <br />
          <Header></Header>
          <Switch>
            <Route path="/home">
              <RaiderOption></RaiderOption>
            </Route>
            <PrivateRoute path="/destination/:id">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/login">
              <LogInBtn></LogInBtn>
            </Route>
            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/blog">
              <Blog></Blog>
            </Route>
          </Switch>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
