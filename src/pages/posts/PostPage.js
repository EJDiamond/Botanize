import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import appStyles from "../../App.module.css";
import Post from './Post';

function PostPage() {
    const [post, setPost] = useState({ results: [] });
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`)
                ]);
                setPost({ results: [post] })
                console.log(post);
            } catch (err) {
                console.log(err)
            }
        };
        handleMount();
    }, [id]);
    return (
        <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={4}>
                Plant whisperers
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={8}>
                <Container className={appStyles.Content}>
                    <Post {...post.results[0]} setPosts={setPost} postPage/>
                    Answers
                </Container>
            </Col>
        </Row>
    )
}

export default PostPage;