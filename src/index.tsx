import './scss/main.scss'
import sjcl from 'sjcl';
import React from "react";
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./containers/Login";


export default function BasicExample() {
    console.log('asdasdasd');
    return (
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
    );
  }
  
  function Dashboard() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  }

  render(<BasicExample />, document.getElementById('root'));


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