import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import appStyles from "../../App.module.css";
import Asset from '../../components/Asset';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Profile from './Profile';

const PlantWhisperers = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    plantWhisperers: { results: [] },
  });
  const { plantWhisperers } = profileData;
  const currentUser = useCurrentUser()

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          plantWhisperers: data,
        }));
      } catch (err) {
        console.log(err)
      }
    };
    handleMount()
  }, [currentUser]);

  return (
    <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
      {plantWhisperers.results.length ? (
        <>
          <p><strong>Plant Whisperers</strong></p>
          {mobile ? (
            <div className='d-flex justify-content-around'>
              {plantWhisperers.results.slice(0, 3).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            plantWhisperers.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PlantWhisperers;