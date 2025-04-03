import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "./header.css"

const header = () => {
  return (
    <>
    <Navbar>
        <Container>
          <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/login" className='nav-link'>Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className='nav-link'>Features</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
  )
}

export default header
