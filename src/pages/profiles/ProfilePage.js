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
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from "../posts/Post";
import { fetchMoreData } from '../../utils/utils';
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from '../../components/OptionDropdown';
import { Link } from 'react-router-dom';



function ProfilePage() {
    const currentUser = useCurrentUser();
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();
    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/posts/?owner__profile=${id}`),
                ]);
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] }
                }))
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [id, setProfileData])

    const userProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
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
                        {profile?.bio && (<Col className='p-3'>{profile.bio}</Col>)}
                    </Row>
                    <Row className='justify-content-center no-gutters'>
                        <div>
                            <Link to="/plants/create">
                                <button className={styles.Button}>
                                    <i className={`fa-solid fa-leaf ${styles.Icon}`}></i>
                                </button>
                            </Link>
                        </div>
                    </Row>
                </Col>
                <Col lg={2} className='mt-2'>
                    {currentUser && !is_owner && (
                        profile?.following_id ? (
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
                </Col>
            </Row>
        </>
    );

    const userProfilePosts = (
        <>
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No posts found, ${profile?.owner} hasn't shared any content yet`}
                />
            )}
        </>
    );


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
                            <hr className={styles.Line} />
                            {userProfilePosts}
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