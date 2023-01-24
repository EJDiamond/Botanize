import React from 'react'
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Answer.module.css';

const Answer = (props) => {
    const { owner, profile_id, profile_image, updated_at, content } = props;

  return (
    <div>
        <hr className={styles.Line}/>
        <Media>
            <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image}/>
            </Link>
            <Media.Body className='align-self-center ml-2'>
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
                <p>{content}</p>
            </Media.Body>
        </Media>
    </div>
  )
}

export default Answer