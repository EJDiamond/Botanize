import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

import appStyles from "../../App.module.css";

function Postspage() {
    return (
        <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Container className={appStyles.Content}>
                    Plant whisperers
                </Container>
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                <Container className={appStyles.Content}>
                    Answers
                </Container>
            </Col>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Image src="https://res.cloudinary.com/ejdiamo/image/upload/v1674561489/hanging-plant_q9kptl.png" alt='hanging plant' />
            </Col>
        </Row>
    )
}

export default Postspage;