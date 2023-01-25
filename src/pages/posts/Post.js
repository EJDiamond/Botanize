import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosRes } from '../../api/axiosDefaults'
import Avatar from '../../components/Avatar'
import { OptionDropdown } from '../../components/OptionDropdown'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import styles from "../../styles/Post.module.css"


const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        bookmark_count,
        bookmark_id,
        answer_count,
        plant,
        plant_type,
        image,
        question,
        updated_at,
        postPage,
        setPosts,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleBookmark = async () => {
        try {
            const { data } = await axiosRes.post("/bookmarks/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, bookmark_count: post.bookmark_count + 1, bookmark_id: data.id }
                        : post;
                })
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteBookmark = async () => {
        try {
            await axiosRes.delete(`/bookmarks/${bookmark_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, bookmark_count: post.bookmark_count - 1, bookmark_id: null }
                        : post;
                })
            }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={50} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span>
                        {is_owner && postPage && (
                            <OptionDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={plant} />
            </Link>
            <Card.Body>
                <div>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Your posts are saved on your profile!</Tooltip>}>
                            <i className={`fa-regular fa-bookmark ${styles.Bookmark}`} />
                        </OverlayTrigger>
                    ) : bookmark_id ? (
                        <span onClick={handleDeleteBookmark}>
                            <i className={`fa-solid fa-bookmark ${styles.Bookmark}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleBookmark}>
                            <i className={`fa-regular fa-bookmark ${styles.Bookmark}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to bookmark posts!</Tooltip>}>
                            <i className={`fa-regular fa-bookmark ${styles.Bookmark}`} />
                        </OverlayTrigger>
                    )}
                    {bookmark_count}
                    <Link to={`/posts/${id}`}>
                        <i className="fa-regular fa-comment" />
                        {answer_count}<strong> Answers</strong>
                    </Link>
                </div>
                <br />
                <br />
                {plant && <Card.Text className='text-left'><strong>Plant: </strong>{plant}</Card.Text>}
                {plant_type && <Card.Text><strong>Plant type: </strong>{plant_type}</Card.Text>}
                {question && <Card.Text className={styles.Cardtext}><strong>Question: </strong>{question}</Card.Text>}
            </Card.Body>
            <hr className={styles.Line} />
        </Card>

    )
}

export default Post