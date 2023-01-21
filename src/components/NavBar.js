import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} fixed="top" expand="md">
            <Container>
                <Navbar.Brand className={styles.Heading}>
                    <img src={logo} alt='logo' height='60' /> <strong>Botanize</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link className={styles.NavLink}>
                            <i className="fa-solid fa-house-chimney"></i> Home</Nav.Link>
                        <Nav.Link className={styles.NavLink}>
                            <i className="fas fa-sign-in-alt"></i> Sign in</Nav.Link>
                        <Nav.Link className={styles.NavLink}>
                            <i className="fas fa-user-plus"></i> Sign up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar