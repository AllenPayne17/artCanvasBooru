import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../AppContex";

function Submenu() {

    const navigate = useNavigate();

    const {selectedKey, setSelectedKey} = useAppContext()
  
    const handleSelect = (eventKey) => {
      setSelectedKey(eventKey);
      navigate('/dashboard')
    };

    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark" style={{padding: '5px 10px 5px 10px'}}>
            <Nav variant="underline" activeKey={selectedKey} onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="link-4" >Upload</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-5" >Random</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-6" >About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-7" >Help</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-8" >Policy</Nav.Link>
            </Nav.Item>
            </Nav>
        </Navbar>
        </>
    );
}

export default Submenu;