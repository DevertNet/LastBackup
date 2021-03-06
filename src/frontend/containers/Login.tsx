import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { hash, decrypt, encrypt } from '../helper/crypt';
import { useSetBackupContext } from "../context/BackupContext";
import { useStoragePassword, useSetStoragePassword } from "../context/StoragePasswordContext";
import { API_URL } from "../contstants";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [hashedPassword, setHashedPassword] = useState("");
    const history = useHistory();
    const [showNewError, setShowNewError] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [createNewStorage, setCreateNewStorage] = useState(false);
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
    const setBackupContext = useSetBackupContext();
    const storagePassword = useStoragePassword();
    const setStoragePassword = useSetStoragePassword();

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
            fetch(API_URL + "api/storage/" + hashedPassword)
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.found) {
                            try {
                                var decryptedData = decrypt(storagePassword, result.encryptedData);
                                setBackupContext(JSON.parse(decryptedData));
                                history.push("/dashboard");
                            }
                            catch (e) {
                                setShowError(true);
                                setErrorMessage('Wrong password to decrypt, or the encrypted message is corrupted.');
                            }

                        } else {
                            setShowNewError(true);
                        }
                    },
                    (error) => {
                        setShowError(true);
                        setErrorMessage('Ooooooops...there was an error.');
                    }
                )
        }
    }

    function hashPassword() {
        var cleanedName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
            hashedPw = hash(password, cleanedName);

        setHashedPassword(hashedPw);
        setStoragePassword(password + cleanedName);
    }

    return (
        <div className="Login">
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title><h1>Welcome to your last backup!</h1></Card.Title>

                    <p>Imagine you are on vacation and all your luggage is stolen. Do you know important phone numbers or bank details by heart? I don't know these things.</p>

                    <p>That's why I created a backup solution where you can store important things with as little data as possible.</p>

                    <p>Why not use a normal cloud? I have protected most services with 2 factor authentication. If I lose my phone and laptop I can't access them anymore.</p>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>Open or create your last backup</Card.Title>

                    <Alert show={showError} variant="danger">
                        {errorMessage}
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