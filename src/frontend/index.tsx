import './scss/main.scss'
import sjcl from 'sjcl';
import React from "react";
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FileEarmarkLockFill } from 'react-bootstrap-icons';
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
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
              </Switch>
            </Router>
          </Container>

          <footer className="mt-4">
          </footer>
        </div>
      </StoragePasswordContextProvider>
    </BackupContextProvider>
  );
}

render(<App />, document.getElementById('root'));
