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

export default function App() {
  return (
    <BackupContextProvider>
      <div>
        <div className="Header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">
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
                <Dashboard />
                <Login />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </Router>
        </Container>
      </div>
    </BackupContextProvider>
  );
}

render(<App />, document.getElementById('root'));


var salt = sjcl.random.randomWords(8, 0);

var options = {
  mode: "ccm", //The cipher mode is a standard for how to use AES and other algorithms to encrypt and authenticate your message. OCB2 mode is slightly faster and has more features, but CCM mode has wider support because it is not patented.
  iter: 5000, //Strengthening makes it slower to compute the key corresponding to your password. This makes it take much longer for an attacker to guess it.
  ks: 256, //Key Size 128 bits should be secure enough, but you can generate a longer key if you wish.
  ts: 128, //SJCL adds a an authentication tag to your message to make sure nobody changes it. The longer the authentication tag, the harder it is for somebody to change your encrypted message without you noticing. 64 bits is probably enough.
  v: 1,
  cipher: "aes",
  adata: "",
  salt: salt
}

var encryptedData = sjcl.encrypt("password", "my secret data", options);

console.log(encryptedData);




var decryptedData = sjcl.decrypt("password", encryptedData)

console.log(decryptedData);