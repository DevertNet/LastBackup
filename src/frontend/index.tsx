import './scss/main.scss'
import React from "react";
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { FileEarmarkLockFill } from 'react-bootstrap-icons';
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import Privacypolicy from "./containers/Privacypolicy";
import BackupContextProvider from "./context/BackupContext";
import StoragePasswordContextProvider from "./context/StoragePasswordContext";

export default function App() {
  return (
    <BackupContextProvider>
      <StoragePasswordContextProvider>
        <div>
          <div className="Header">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">
                  <FileEarmarkLockFill />{' '}
                  LastBackup
                  </Navbar.Brand>
              </Container>
            </Navbar>
          </div>

          <Container className="page-content">
            <Router>
              {/*
                  A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/privacypolicy">
                  <Privacypolicy />
                </Route>
              </Switch>

              <footer className="mt-4 mb-4">
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link className="nav-link" to="/privacypolicy">Privacy policy</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://www.devert.net/impressum" target="_blank">Imprint</a>
                  </li>
                </ul>
              </footer>
            </Router>
          </Container>
        </div>
      </StoragePasswordContextProvider>
    </BackupContextProvider>
  );
}

render(<App />, document.getElementById('root'));
