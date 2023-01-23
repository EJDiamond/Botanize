import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import styles from "../../styles/Post.module.css"
import PostPage from './PostPage'

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        bookmark_id,
        answer_count,
        plant,
        plant_type,
        image,
        question,
        updated_at,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

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
                        {is_owner && PostPage && <i class="fa-solid fa-ellipsis-vertical"></i>}
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
                            <i className="fa-regular fa-bookmark" />
                        </OverlayTrigger>
                    ) : bookmark_id ? (
                        <span onClick={() => { }}>
                            <i className={`fa-solid fa-bookmark`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={() => { }}>
                            <i className={`fa-regular fa-bookmark`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to bookamrk posts!</Tooltip>}>
                            <i className="fa-regular fa-bookmark" />
                        </OverlayTrigger>
                    )}
                    <Link to={`/posts/${id}`}>
                        <i class="fa-regular fa-comment" />
                        {answer_count}<strong> Answers</strong>
                    </Link>
                </div>
                <br/>
                {plant && <Card.Text className='text-left'><strong>Plant: </strong>{plant}</Card.Text>}
                {plant_type && <Card.Text><strong>Plant type: </strong>{plant_type}</Card.Text>}
                {question && <Card.Text><strong>Question: </strong>{question}</Card.Text>}
            </Card.Body>
        </Card>
    )
}

export default Post