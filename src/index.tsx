import './scss/main.scss'
import sjcl from 'sjcl';
import React, { useState } from "react";
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FileEarmarkLockFill } from 'react-bootstrap-icons';
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import BackupContext from "./context/BackupContext";


export default function App() {
    const [backupContext, setBackupContext] = useState({
      'note': 'Example Note',
      'files': [
      {
          'filename': 'test.jpg',
          'dataUrl': 'data:image/png;base64,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',
          'createdAt': '01.01.2021'
      }
      ]
  });

    return (
      <BackupContext.Provider value={[backupContext, setBackupContext]}>
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
      </BackupContext.Provider>
    );
  }

  render(<App />, document.getElementById('root'));


document.getElementById('file-field').onchange = function () {
    var reader 	= new FileReader;
    
    reader.onload = function(e) {
        //document.getElementById('buffer').innerHTML = e.target.result;
        console.log(e.target.result);

        document.getElementById('download-link').setAttribute("href", e.target.result);
        
    };	

    reader.onprogress = function(e) {
        // if (e.lengthComputable) {
        //     var progress = Math.round((e.loaded / e.total) * 100);
        //     document.getElementById('buffer').innerHTML = progress + '%';
        // }
    };

    var fl = this.files[0];
        // fl.name
        // fl.type
        // fl.size

    reader.readAsDataURL(this.files[0]);
    // reader.readAsBinaryString() 	// Read as binar mode 
    // reader.readAsText() 			// Read as text mode  (can set charset)
    // reader.readAsDataURL() 		// Read as binar mode with convert to Data:URL

    // More information: http://www.w3.org/TR/FileAPI/
};

var salt = sjcl.random.randomWords(8, 0);

var options = {
    mode:"ccm", //The cipher mode is a standard for how to use AES and other algorithms to encrypt and authenticate your message. OCB2 mode is slightly faster and has more features, but CCM mode has wider support because it is not patented.
    iter:5000, //Strengthening makes it slower to compute the key corresponding to your password. This makes it take much longer for an attacker to guess it.
    ks:256, //Key Size 128 bits should be secure enough, but you can generate a longer key if you wish.
    ts:128, //SJCL adds a an authentication tag to your message to make sure nobody changes it. The longer the authentication tag, the harder it is for somebody to change your encrypted message without you noticing. 64 bits is probably enough.
    v:1,
    cipher:"aes",
    adata:"",
    salt:salt
}

var encryptedData = sjcl.encrypt("password", "my secret data", options);

console.log(encryptedData);




var decryptedData = sjcl.decrypt("password", encryptedData)

console.log(decryptedData);