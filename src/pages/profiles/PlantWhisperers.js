import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import appStyles from "../../App.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const PlantWhisperers = () => {
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
    <Container className={appStyles.Content}>
      <p>Plant Whisperers</p>
      {plantWhisperers.results.map((profile) => (
          <p key={profile.id}>{profile.owner}</p>
      ))}
    </Container>
  );
};

export default PlantWhisperers;