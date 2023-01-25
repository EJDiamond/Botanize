import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Button, Container} from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/ProfilePage.module.css'
import btnStyles from '../../styles/Button.module.css';
import appStyles from "../../App.module.css";
import PlantWhisperers from './PlantWhisperers';
import Asset from '../../components/Asset';


function ProfilePage() {
    const currentUser = useCurrentUser();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        setHasLoaded(true);
    }, [])

    const userProfile = (
        <>
            <Row noGutters className='px-3 text-center'>
                <Col lg={3}>
                    <div>
                        <Image
                            roundedCircle
                        />
                    </div>
                    <div>
                        <h3>owner name</h3>
                    </div>
                </Col>
                <Col lg={7}>
                    <Row className='justify-content-center no-gutters'>
                        <Col xs={3} className='my-2'>
                            {/* <div>{ProfilePage.posts_count}</div> */}
                            <div>Posts</div>
                        </Col>
                        <Col xs={3} className='my-2'>
                            {/* <div>{ProfilePage.followers_count}</div> */}
                            <div>Followers</div>
                        </Col>
                        <Col xs={3} className='my-2'>
                            {/* <div>{ProfilePage.following_count}</div> */}
                            <div>Following</div>
                        </Col>
                    </Row>
                    <Row>
                        bio
                    </Row>
                </Col>
                <Col lg={2}>
                    {/* {currentUser && !is_owner && (
                        profile?.following_id ? (
                            <Button className={`${btnStyles.ButtonWhite}`}>
                                Unfollow
                            </Button>
                        ) : (
                            <Button className={`${btnStyles.Button}`}>
                                Follow
                            </Button>
                        ))} */}
                </Col>
            </Row>
        </>
    )


  return (
    <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <PlantWhisperers />
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                <PlantWhisperers mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {userProfile}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Image className="position-fixed" src="https://res.cloudinary.com/ejdiamo/image/upload/v1674561489/hanging-plant_q9kptl.png" alt='hanging plant' />
            </Col>
    </Row>
  )
}

export default ProfilePage