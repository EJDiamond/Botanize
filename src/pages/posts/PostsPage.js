import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import App from '../../App'

import appStyles from "../../App.module.css";

function PostsPage() {
    return (
        <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={4}>
                Plant whisperers
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={8}>
                <Container className={appStyles.Content}>
                    Answers
                </Container>
            </Col>
        </Row>
    )
}

export default PostsPage;