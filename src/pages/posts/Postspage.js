import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import Post from './Post';
import Asset from '../../components/Asset';

function Postspage({ filter = "", message }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        };
        setHasLoaded(false)
        fetchPosts();
    }, [filter, pathname]);

    return (
        <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Container className={appStyles.Content}>
                    Plant whisperers
                </Container>
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                {hasLoaded ? (
                    <>
                        {posts.results.length ? (
                            posts.results.map((post) => (
                                <Post key={post.id} {...post} setPosts={setPosts} />
                            ))
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
                <Container className={appStyles.Content}>
                    Answers
                </Container>
            </Col>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Image className="position-fixed" src="https://res.cloudinary.com/ejdiamo/image/upload/v1674561489/hanging-plant_q9kptl.png" alt='hanging plant' />
            </Col>
        </Row>
    )
}

export default Postspage;