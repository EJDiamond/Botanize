import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/Profile.module.css';

import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const Profile = (props) => {
    const { profile, mobile, imageSize = 40 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div className={`align-items-center my-3 d-flex ${mobile && "flex-column"}`}>
            <div>
                <Link className='align-self-center' to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.Owner}`}>
                {owner}
            </div>
            <div className={`text-right ${!mobile && 'ml-auto'}`}>
                {!mobile && currentUser && !is_owner && (
                    following_id ? (
                        <Button
                            className={`${btnStyles.ButtonWhite}`}
                            onClick={() => handleUnfollow(profile)}
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button
                            className={`${btnStyles.Button}`}
                            onClick={() => handleFollow(profile)}
                        >
                            Follow
                        </Button>
                    ))}
            </div>
        </div>
    )
}

export default Profile