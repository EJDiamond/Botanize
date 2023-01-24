import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import Post from './Post';
import AnswerCreateForm from '../answers/AnswerCreateForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from "../../App.module.css";

function PostPage() {
    const [post, setPost] = useState({ results: [] });
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [answers, setAnswers] = useState({ results: [] });

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
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Container className={appStyles.Content}>
                    Plant whisperers
                </Container>
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                <Container className={appStyles.Content}>
                    <Post {...post.results[0]} setPosts={setPost} postPage />
                    {currentUser ? (
                        <AnswerCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            post={id}
                            setPost={setPost}
                            setAnswers={setAnswers}
                        />
                    ) : answers.results.length ? (
                        "Answers"
                    ) : null}
                </Container>
            </Col>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Image className="position-fixed" src="https://res.cloudinary.com/ejdiamo/image/upload/v1674561489/hanging-plant_q9kptl.png" alt='hanging plant' />
            </Col>
        </Row>
    )
}

export default PostPage;