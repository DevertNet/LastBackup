import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { TrashFill, CloudDownloadFill } from 'react-bootstrap-icons';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useBackupContext, useSetBackupContext } from "../context/BackupContext";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [hashedPassword, setHashedPassword] = useState("");
    const history = useHistory();
    const [showError, setShowError] = useState(false);

    const backupContext = useBackupContext();
    const setBackupContext = useSetBackupContext();

    function handleUpload(e) {
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
        };

        reader.onprogress = function (e) {
            // if (e.lengthComputable) {
            //     var progress = Math.round((e.loaded / e.total) * 100);
            //     document.getElementById('buffer').innerHTML = progress + '%';
            // }
        };

        var fl = e.target.files[0];
        reader.readAsDataURL(e.target.files[0]);
    }

    function updateNote(e) {
        let note = e.target.value;

        setBackupContext((current) => {
            return {
                ...current,
                note
            }
        });
    }

    function deleteFile(file: any[], index: number) {
        setBackupContext((current) => {
            let files = current.files;

            //delete file from context
            files.splice(index, 1);

            return {
                ...current,
                ...files
            }
        });
    }

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>

            <Card>
                <Card.Body>
                    <Card.Title>Notes</Card.Title>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Here is some space for notes like important phone numbers etc.</Form.Label>
                        <Form.Control as="textarea" rows={3} value={backupContext.note} onChange={updateNote} />
                    </Form.Group>
                </Card.Body>
            </Card>

            <hr />

            <Card>
                <Card.Body>
                    <Card.Title>Files</Card.Title>

                    <Form.File
                        id="custom-file"
                        label="Custom file input"
                        onChange={(e) => { handleUpload(e); }}
                        custom
                    />

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
                                    <td><a target="_blank" download={file.filename} href={file.dataUrl}>{file.filename}</a></td>
                                    <td>{file.createdAt}</td>
                                    <td><a className="btn btn-primary" target="_blank" download={file.filename} href={file.dataUrl}><CloudDownloadFill /></a> <Button onClick={(e) => { deleteFile(file, index) }} variant="danger"><TrashFill /></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </div>
    );
}