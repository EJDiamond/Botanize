import React, { useState } from 'react'
import { Media } from 'react-bootstrap';
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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const [showEditForm, setShowEditForm] = useState(false);

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