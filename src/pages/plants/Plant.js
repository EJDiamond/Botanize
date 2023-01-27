import React from 'react'
import Media from 'react-bootstrap/Media'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosRes } from '../../api/axiosDefaults'
import Avatar from '../../components/Avatar'
import { OptionDropdown } from '../../components/OptionDropdown'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import styles from "../../styles/PostPlant.module.css"


const Plant = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        plant_name,
        plant_type,
        plant_type_display,
        image,
        age,
        about,
        updated_at,
        plantPage,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/plants/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/plants/${id}/`);
            history.push('/plants/');
        } catch (err) {
            console.log(err);
        }
    };


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
                        {is_owner && plantPage && (
                            <OptionDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/plants/${id}`}>
                <Card.Img src={image} alt={plant_name} />
            </Link>
            <Card.Body>
                <br />
                <br />
                {plant_name && <Card.Text className='text-left'><strong>Plant: </strong>{plant_name}</Card.Text>}
                {plant_type && <Card.Text><strong>Plant type: </strong>{plant_type_display}</Card.Text>}
                {age && <Card.Text className={styles.Cardtext}><strong>Age: </strong>{age}</Card.Text>}
                {about && <Card.Text className={styles.Cardtext}><strong>About: </strong>{about}</Card.Text>}
            </Card.Body>
            <hr className={styles.Line} />
        </Card>

    )
}

export default Plant;