import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from "../../components/Avatar";
import styles from "../../styles/AnswerCreateEditForm.module.css";

function AnswerCreateForm(props) {
    const { post, setPost, setAnswers, profileImage, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/answers/", {
                content,
                post,
            });
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                results: [data, ...prevAnswers.results],
            }));
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        answer_count: prevPost.results[0].answer_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form className='mt-2' onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        placeholder='answer...'
                        as="textarea"
                        value={content}
                        rows={4}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                Post
            </button>
        </Form>
    );
}

export default AnswerCreateForm;