import React from 'react'
import { Container } from 'react-bootstrap';
import appStyles from "../../App.module.css";
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';

const PlantWhisperers = ({ mobile }) => {
  const { plantWhisperers } = useProfileData();

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