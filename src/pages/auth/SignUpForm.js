import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
    return (
        <Row className={styles.Row}>
            <Col className="my-auto py-2 p-md-2" md={7}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>Sign Up</h1>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control className={styles.Input} type="text" placeholder="Username" name="username" />
                        </Form.Group>
                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control className={styles.Input} type="password" placeholder="Password" name="password1" />
                        </Form.Group>
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">Confirm password</Form.Label>
                            <Form.Control className={styles.Input} type="password" placeholder="Confirm password" name="password2" />
                        </Form.Group>
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide}`} type="submit">
                            Sign Up
                        </Button>
                    </Form>


                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="signin">
                        Already a member? <span>Sign In</span>
                    </Link>
                </Container>
            </Col>
            <Col md={{ span: 4, offset: 1 }} className={`my-auto d-none d-md-block p-4 ${styles.SignUpCol}`}>
                <Image className={`${appStyles.SignUpInImage}`} src={"https://res.cloudinary.com/ejdiamo/image/upload/c_scale,h_489/v1673476808/big-plant_aukg87.png"} />
            </Col>
        </Row>
    );
};

export default SignUpForm