import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useAppContext } from '../AppContex';
import { useNavigate } from 'react-router-dom';

function Menus(){


    const navigate = useNavigate();

    const {selectedKey, setSelectedKey} = useAppContext()
  
    const handleSelect = (eventKey) => {
      setSelectedKey(eventKey);
      navigate('/dashboard')
    };


    return(
        <>
        <Nav variant="tabs" activeKey={selectedKey} onSelect={handleSelect} style={{color: 'black'}}>
            <Nav.Item>
            <Nav.Link eventKey="link-1" style={{color: 'black'}}>My Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="link-2" style={{color: 'black'}}>Posts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="link-3" style={{color: 'black'}}>Artists</Nav.Link>
            </Nav.Item>
        </Nav>

        </>
    )
}

export default Menus;