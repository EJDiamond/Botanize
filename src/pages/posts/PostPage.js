import React, { useEffect, useState } from 'react'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import Post from './Post';
import AnswerCreateForm from '../answers/AnswerCreateForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import appStyles from "../../App.module.css";
import Answer from '../answers/Answer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from "../../utils/utils";
import Asset from '../../components/Asset';
import PlantWhisperers from '../profiles/PlantWhisperers';


function PostPage() {
    const [post, setPost] = useState({ results: [] });
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [answers, setAnswers] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, { data: answers }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/answers/?post=${id}`)
                ]);
                setPost({ results: [post] });
                setAnswers(answers);
            } catch (err) {
                // console.log(err)
            }
        };
        handleMount();
    }, [id]);
    return (
        <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <PlantWhisperers />
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                <Container className={appStyles.Content}>
                    <PlantWhisperers mobile />
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
                    {answers.results.length ? (
                        <InfiniteScroll
                            children={answers.results.map((answer) => (
                                <Answer
                                    key={answer.id}
                                    {...answer}
                                    setPost={setPost}
                                    setAnswers={setAnswers}
                                />
                            ))}
                            dataLength={answers.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!answers.next}
                            next={() => fetchMoreData(answers, setAnswers)}
                        />
                    ) : currentUser ? (
                        <span className='pl-3'>Be the first to answer ...</span>
                    ) : (
                        <span className='pl-3'>No answers yet!</span>
                    )}
                    <br />
                </Container>
            </Col>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Image className="position-fixed" src="https://res.cloudinary.com/ejdiamo/image/upload/v1674561489/hanging-plant_q9kptl.png" alt='hanging plant' />
            </Col>
        </Row>
    )
}

export default PostPage;