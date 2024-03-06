import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import './NavigationBar.css';
import { useAuth } from '../../AuthContext'; // Import the useAuth hook

function MyNavbar() {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <NavDropdown title="Services" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} className="nav-link" to="/LearningLicense">Apply for Learning License</NavDropdown.Item>
            <NavDropdown.Item as={Link} className="nav-link" to="/PermanentLicense">Apply for Permanent License</NavDropdown.Item>
            <NavDropdown.Item as={Link} className="nav-link" to="/Appointment">Book an Appointment</NavDropdown.Item>
          </NavDropdown>
          <NavLink as={Link}  className="nav-link" to="/AboutUs">About us</NavLink>
          <NavLink  as={Link} className="nav-link" to="/ContactUs">Contact us</NavLink>
          <NavDropdown title="More" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} className="nav-link" to="/Information">Information</NavDropdown.Item>
            <NavDropdown.Item as={Link} className="nav-link" to="/ExternalLink">Link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {isLoggedIn ? (
          <Button variant="danger" className="mx-2" onClick={handleLogout}>
            Signout
          </Button>
        ) : (
          <Button variant="primary" className="mx-2" as={Link} to="/Signin" role="button">
            Signin
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
