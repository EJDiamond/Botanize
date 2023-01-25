import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Button, Container } from 'react-bootstrap';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/ProfilePage.module.css'
import btnStyles from '../../styles/Button.module.css';
import appStyles from "../../App.module.css";
import PlantWhisperers from './PlantWhisperers';
import Asset from '../../components/Asset';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';



function ProfilePage() {
    const currentUser = useCurrentUser();
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();
    const setProfileData = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`)
                ])
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] }
                }))
            } catch (err) {
                console.log(err)
            }
            setHasLoaded(true);
        }
        fetchData();
    }, [id, setProfileData])

    const userProfile = (
        <>
            <Row noGutters className='px-3 text-center'>
                <Col lg={3} className='text-lg-center'>
                    <div>
                        <Image
                            className={styles.ProfileImage}
                            src={profile?.image}
                            roundedCircle
                        />
                    </div>
                    <div>
                        <h5 className='m-2'>{profile?.owner}</h5>
                    </div>
                </Col>
                <Col lg={7}>
                    <Row className='justify-content-center no-gutters mt-2'>
                        <Col xs={3} className='my-2'>
                            <div>{profile?.posts_count}</div>
                            <div className={styles.CountText}>Posts</div>
                        </Col>
                        <Col xs={3} className='my-2'>
                            <div>{profile?.followers_count}</div>
                            <div className={styles.CountText}>Followers</div>
                        </Col>
                        <Col xs={3} className='my-2'>
                            <div>{profile?.following_count}</div>
                            <div className={styles.CountText}>Following</div>
                        </Col>
                    </Row>
                    <Row className='justify-content-center no-gutters'>
                        { profile?.content && (<Col className='p-3'>{profile.content}</Col>)}
                    </Row>
                </Col>
                <Col lg={2} className='mt-2'>
                    {currentUser && !is_owner && (
                        profile?.following_id ? (
                            <Button className={`${btnStyles.ButtonWhite}`}>
                                Unfollow
                            </Button>
                        ) : (
                            <Button className={`${btnStyles.Button}`}>
                                Follow
                            </Button>
                        ))}
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