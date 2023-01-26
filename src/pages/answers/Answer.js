import React, { useState } from 'react'
import { Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { OptionDropdown } from '../../components/OptionDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Answer.module.css';
import AnswerEditForm from './AnswerEditForm';

const Answer = (props) => {
    const {
        owner,
        profile_id,
        profile_image,
        updated_at,
        content,
        id,
        setPost,
        setAnswers,
        like_id,
        like_count,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const [showEditForm, setShowEditForm] = useState(false);

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { answer: id });
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                results: prevAnswer.results.map((answer) => {
                    return answer.id === id
                        ? { ...answer, like_count: answer.like_count + 1, like_id: data.id }
                        : answer;
                })
            }))
        } catch (err) {
            console.log(err)
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                results: prevAnswer.results.map((answer) => {
                    return answer.id === id
                    ? { ...answer, like_count: answer.like_count -1, like_id: null }
                    : answer;
                }),
            }));
        } catch(err) {
            console.log(err)
        }
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/answers/${id}`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        answer_count: prevPost.results[0].answer_count - 1,
                    },
                ],
            }));

            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                results: prevAnswers.results.filter((answer) => answer.id !== id),
            }));
        } catch (err) { }
    };

    return (
        <>
            <hr className={styles.Line} />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className='align-self-center ml-2'>
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    {showEditForm ? (
                        <AnswerEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setAnswers={setAnswers}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}

                </Media.Body>
                <div className={styles.LikeIcon}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can't like your own answer</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like answers!</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    )}
                    {like_count}
                </div>
                {is_owner && !showEditForm && (
                    <OptionDropdown
                        handleEdit={() => setShowEditForm(true)}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
};

export default Answer;