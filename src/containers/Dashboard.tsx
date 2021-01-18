import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { TrashFill, CloudDownloadFill } from 'react-bootstrap-icons';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import sjcl from 'sjcl';
//import "./Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const history = useHistory();
  const [showError, setShowError] = useState(false);

  function handleUpload(e)
  {
    console.log(e);

    var reader 	= new FileReader;
    
    reader.onload = function(e) {
        //document.getElementById('buffer').innerHTML = e.target.result;
        console.log(e.target.result);

        //document.getElementById('download-link').setAttribute("href", e.target.result);
        
    };	

    reader.onprogress = function(e) {
        // if (e.lengthComputable) {
        //     var progress = Math.round((e.loaded / e.total) * 100);
        //     document.getElementById('buffer').innerHTML = progress + '%';
        // }
    };

    var fl = e.target.files[0];
        // fl.name
        // fl.type
        // fl.size

    reader.readAsDataURL(e.target.files[0]);
    // reader.readAsBinaryString() 	// Read as binar mode 
    // reader.readAsText() 			// Read as text mode  (can set charset)
    // reader.readAsDataURL() 		// Read as binar mode with convert to Data:URL

    // More information: http://www.w3.org/TR/FileAPI/
  }

  return (
    <div className="Dashboard">
        <h1>Dashboard</h1>

        <Card>
            <Card.Body>
                <Card.Title>Notes</Card.Title>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Here is some space for notes like important phone numbers etc.</Form.Label>
                    <Form.Control as="textarea" rows={3} />
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
                    onChange={(e) => {handleUpload(e);}}
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
                        <tr>
                            <td>Demo.jpg</td>
                            <td>01.01.2021</td>
                            <td><Button variant="primary"><CloudDownloadFill /></Button> <Button variant="danger"><TrashFill /></Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>

    </div>
  );
}