import React from 'react'
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { OptionDropdown } from '../../components/OptionDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Answer.module.css';

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
        <div>
            <hr className={styles.Line} />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className='align-self-center ml-2'>
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    <p>{content}</p>
                </Media.Body>
                {is_owner && (
                    <OptionDropdown handleDelete={handleDelete} />
                )}
            </Media>
        </div>
    );
};

export default Answer;