import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TrashFill, CloudDownloadFill } from 'react-bootstrap-icons';
import { Button, Alert, Table, Card, Form, Spinner } from "react-bootstrap";
import { useBackupContext, useSetBackupContext } from "../context/BackupContext";
import { useStoragePassword } from "../context/StoragePasswordContext";
import { API_URL } from "../contstants";
import { encrypt } from '../helper/crypt';

export default function Dashboard() {
    const navigate = useNavigate();
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const backupContext = useBackupContext();
    const setBackupContext = useSetBackupContext();
    const storagePassword = useStoragePassword();

    //check if backupContext is new; redirect to login
    useEffect(() => {
        if (!backupContext.hashedPassword) {
            navigate("/", { replace: true });
        }
    }, [backupContext.hashedPassword, navigate]);

    if (!backupContext.hashedPassword) {
        return null;
    }

    function updateNote(e) {
        let note = e.target.value;

        setBackupContext((current) => {
            return {
                ...current,
                note
            }
        });

        setUnsavedChanges(true);
    }

    function addFile(e) {
        var reader = new FileReader;

        reader.onload = function (e) {
            let file = {
                'filename': fl.name,
                'dataUrl': e.target.result,
                'createdAt': new Date().toISOString(),
                'size': fl.size,
                'lastModified': fl.lastModified,
            };

            setBackupContext((current) => {
                let files = [
                    ...current.files,
                    file
                ];

                return {
                    ...current,
                    files
                }
            });

            setUnsavedChanges(true);
        };

        reader.onprogress = function (e) {
            // if (e.lengthComputable) {
            //     var progress = Math.round((e.loaded / e.total) * 100);
            //     document.getElementById('buffer').innerHTML = progress + '%';
            // }
        };

        var fl = e.target.files[0];
        if (!fl) {
            return;
        }
        reader.readAsDataURL(fl);
    }

    function deleteFile(file: any[], index: number) {
        setBackupContext((current) => {
            let files = [...current.files];

            //delete file from context
            files.splice(index, 1);

            return {
                ...current,
                files
            }
        });
    }

    function saveBackup() {
        setShowSpinner(true);

        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors', // defaults to same-origin
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                encryptedData: encrypt(storagePassword, JSON.stringify(backupContext))
            })
        };
        fetch(API_URL + 'api/storage/' + backupContext.hashedPassword, requestOptions)
            .then(response => response.json())
            .then(
                (data) => {
                    setShowSpinner(false);

                    if (data.success) {
                        setUnsavedChanges(false);
                        setShowError(false);
                        setErrorMessage('');
                    } else {
                        setShowError(true);
                        setErrorMessage(data.errorMessage);
                    }
                },
                (error) => {
                    setShowSpinner(false);
                    setShowError(true);
                    setErrorMessage('Whoops? Nothing saved :/');
                    console.log(error);
                }
            );
    }

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>

            <Alert show={showError} variant="danger">
                {errorMessage}
            </Alert>

            <Alert variant={unsavedChanges ? 'danger' : 'info'}>
                {unsavedChanges ? (
                    <div>There are unsaved changes! Do you want to update your backup?</div>
                ) : (
                        <div>No changes so far...</div>
                    )}
                <Button size="sm" type="submit" disabled={!unsavedChanges} onClick={saveBackup}>Save</Button>
                <Spinner animation="border" variant="dark" size="sm" className={'ms-2 ' + (showSpinner ? '' : 'd-none')} />
            </Alert>

            <Card>
                <Card.Body>
                    <Card.Title>Notes</Card.Title>

                    <Form.Group controlId="formNote">
                        <Form.Label>Here is some space for notes like important phone numbers etc.</Form.Label>
                        <Form.Control as="textarea" rows={3} value={backupContext.note} onChange={updateNote} />
                    </Form.Group>
                </Card.Body>
            </Card>

            <hr />

            <Card>
                <Card.Body>
                    <Card.Title>Files</Card.Title>

                    <Form.Group controlId="custom-file">
                        <Form.Label>Add a file to your backup</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => { addFile(e); }}
                        />
                    </Form.Group>

                    <hr />

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Created At</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {backupContext.files.map((file, index) =>
                                <tr key={index}>
                                    <td><a target="_blank" download={file.filename} href={file.dataUrl} rel="noreferrer">{file.filename}</a></td>
                                    <td>{file.createdAt}</td>
                                    <td><a className="btn btn-primary" target="_blank" download={file.filename} href={file.dataUrl} rel="noreferrer"><CloudDownloadFill /></a> <Button onClick={(e) => { deleteFile(file, index) }} variant="danger"><TrashFill /></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </div>
    );
}
