import React from 'react';
import { Table, Button, Form, Container } from 'react-bootstrap';

function ProfileSuAdmin() {
    function handleView() {
        alert("Viewing details for user ID: ");
    }

    return (
        <>
            <h1>Panel de SuperAdmin</h1>
            <br />
            <Container>
                <div className="d-flex justify-content-between mb-3">
                    <Button variant="primary">Register Now</Button>
                    <Form className="d-flex" style={{ maxWidth: '300px' }}>
                        {/* <Form.Control type="search" placeholder="Search Records" className="me-2" /> */}
                        {/* <Button variant="success">Search</Button> */}
                    </Form>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Type</th> {/* Nueva columna */}
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>677060e43c7c7369ff9d621c</td>
                            <td>Admin1</td>
                            <td>admin1@admin.com</td>
                            <td>Admin</td> {/* Tipo de usuario */}
                            <td>
                                <Button variant="success" size="sm" className="me-2">View</Button>
                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>677062653c7c7369ff9d6222</td>
                            <td>admin4</td>
                            <td>admin4@admin.com</td>
                            <td>Admin</td> {/* Tipo de usuario */}
                            <td>
                                <Button variant="success" size="sm" className="me-2">View</Button>
                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>677062873c7c7369ff9d6224</td>
                            <td>admin3</td>
                            <td>admin3@admin.com</td>
                            <td>Admin</td> {/* Tipo de usuario */}
                            <td>
                                <Button variant="success" size="sm" className="me-2">View</Button>
                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>67773ef0cf4f3363c0ce9930</td>
                            <td>Carlos Martínez Leon</td>
                            <td>carlos.martinez@gmail.com</td>
                            <td>Instructor</td> {/* Tipo de usuario */}
                            <td>
                                <Button variant="success" size="sm" className="me-2" onClick={() => handleView()}>View</Button>
                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>677a4a56cfdf070f03e6dfc4</td>
                            <td>Aldahir17</td>
                            <td>aldahir605000flo@gmail.com</td>
                            <td>Instructor</td> {/* Tipo de usuario */}
                            <td>
                                <Button variant="success" size="sm" className="me-2" onClick={() => handleView()}>View</Button>
                                <Button variant="primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                        
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ProfileSuAdmin;