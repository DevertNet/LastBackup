import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import sjcl from 'sjcl';
//import "./Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const history = useHistory();
  const [showError, setShowError] = useState(false);
  var timer: any;

  useEffect(() => {
    hashPassword();
  }, [name, password]);

  function validateForm() {
    return name.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(name);
    console.log(password);
    



    hashPassword();

    setShowError(true);

    alert('wip');
    history.push("/dashboard");
  }

  function hashPassword() {
    var cleanedName = name.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
    console.log(cleanedName);

    var salt = sjcl.codec.utf8String.toBits("lastbackup" + name);
    var hashedPw = sjcl.misc.pbkdf2(password, salt, 5000, 256);
    hashedPw = sjcl.codec.hex.fromBits(hashedPw);

    setHashedPassword(hashedPw);
  }

  return (
    <div className="Login">
        <Card>
            <Card.Body>
                <Card.Title>Open or create your last backup</Card.Title>
                <Alert show={showError} variant="danger">
                    We have not found any files for this name/password combination. If you already have a backup, then your name or password is incorrect.
                    <br /><br />
                    
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Create a new backup for this name/password combination?" />
                    </Form.Group>
                </Alert>
                
                <Form.Group size="lg" controlId="name">
                    <Form.Label>First- and Lastname</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => {setName(e.target.value);}}
                    />
                    <small>As on your ID card/passport; Is not sent to the server as plaintext.</small>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value);}}
                    />
                    <small>Is not sent to the server as plaintext.</small>
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" />
                        <Form.Check.Label>We don't know what you store: Zero-Knowledge encryption. I have read and agree to the <Link to="/privacypolicy">privacy policy.</Link></Form.Check.Label>
                    </Form.Check>
                </Form.Group>

                <hr />

                <Form.Group size="lg" controlId="hashedPassword">
                    <Form.Label>Hashed Storagekey (Name + Password)</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        disabled={true}
                        value={hashedPassword}
                        onChange={(e) => setHashedPassword(e.target.value)}
                    />
                    <small>Will be used to identify your storage files. Hashed with PBKDF2. <strong>Will be sent to the server.</strong></small>
                </Form.Group>

                <Form onSubmit={handleSubmit}>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>

    </div>
  );
}