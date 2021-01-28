import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, Card, Alert } from "react-bootstrap";
import sjcl from 'sjcl';
import { useSetBackupContext } from "../context/BackupContext";
import { API_URL } from "../contstants";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [hashedPassword, setHashedPassword] = useState("");
    const history = useHistory();
    const [showNewError, setShowNewError] = useState(false);
    const [showXhrError, setShowXhrError] = useState(false);
    const [createNewStorage, setCreateNewStorage] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
    const setBackupContext = useSetBackupContext();

    useEffect(() => {
        hashPassword();
    }, [name, password]);

    function validateForm() {
        return name.length > 0 && password.length > 0 && privacyPolicyAccepted;
    }

    function handleSubmit(event) {
        event.preventDefault();

        hashPassword();

        //check if user want to create a new storage
        if (createNewStorage) {
            setBackupContext((current) => {
                return {
                    ...current,
                    hashedPassword
                }
            });
            history.push("/dashboard");
        } else {
            //check if user has a storage
            fetch(API_URL + "api/storage/gf897g87df8g7dfg89d78fg8dfg")
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.found) {
                            console.log('REDIRECT!!!');
                            //history.push("/dashboard");
                        } else {
                            setShowNewError(true);
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setShowXhrError(true);
                    }
                )
        }
    }

    function hashPassword() {
        var cleanedName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        var salt = sjcl.codec.utf8String.toBits("lastbackup" + cleanedName);
        var hashedPw = sjcl.misc.pbkdf2(password, salt, 5000, 256);
        hashedPw = sjcl.codec.hex.fromBits(hashedPw);

        setHashedPassword(hashedPw);
    }

    return (
        <div className="Login">
            <Card>
                <Card.Body>
                    <Card.Title>Open or create your last backup</Card.Title>

                    <Alert show={showXhrError} variant="danger">
                        Ooooooops...there was an error.
                    </Alert>

                    <Alert show={showNewError} variant="danger">
                        We have not found any files for this name/password combination. If you already have a backup, then your name or password is incorrect.
                    <br /><br />

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check onChange={(e) => { setCreateNewStorage(e.target.checked); }} type="checkbox" label="Create a new backup for this name/password combination?" />
                        </Form.Group>
                    </Alert>

                    <Form.Group controlId="name">
                        <Form.Label>First- and Lastname</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value); }}
                        />
                        <small>As on your ID card/passport; Is not sent to the server as plaintext.</small>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); }}
                        />
                        <small>Is not sent to the server as plaintext.</small>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox">
                            <Form.Check.Input type="checkbox" onChange={(e) => { setPrivacyPolicyAccepted(e.target.checked); }} />
                            <Form.Check.Label>We don't know what you store: Zero-Knowledge encryption. I have read and agree to the <Link to="/privacypolicy">privacy policy.</Link></Form.Check.Label>
                        </Form.Check>
                    </Form.Group>

                    <hr />

                    <Form.Group controlId="hashedPassword">
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