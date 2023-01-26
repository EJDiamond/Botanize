import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInIcons =
        <>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
                <i className="fa-solid fa-square-plus"></i> Create
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/explore">
                <i className="fa-solid fa-compass"></i> Explore
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/bookmarks">
                <i className="fa-solid fa-bookmark"></i> Saved
            </NavLink>
            <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
                <i className="fas fa-sign-out-alt"></i> Sign out
            </NavLink>
            <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
                <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            </NavLink>
        </>
    const loggedOutIcons = (
        <>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
                <i className="fas fa-sign-in-alt"></i> Sign in
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                <i className="fas fa-user-plus"></i> Sign up
            </NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} className={styles.NavBar} fixed="top" expand="md">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand className={styles.Heading}>
                        <img src={logo} alt='logo' height='60' /> <strong>Botanize</strong>
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-center">
                        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
                            <i className="fa-solid fa-house-chimney"></i> Home
                        </NavLink>
                        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/plants">
                        <i className="fa-solid fa-leaf"></i> Plants
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar