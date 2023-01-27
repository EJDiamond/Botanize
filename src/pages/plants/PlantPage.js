import React, { useEffect, useState } from 'react'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import appStyles from "../../App.module.css";
import PlantWhisperers from '../profiles/PlantWhisperers';
import Plant from './Plant';


function PlantPage() {
    const [plant, setPlant] = useState({ results: [] });
    const { id } = useParams();


    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: plant }] = await Promise.all([
                    axiosReq.get(`/plants/${id}`)
                ]);
                setPlant({ results: [plant] });
            } catch (err) {
                // console.log(err)
            }
        };
        handleMount();
    }, [id]);
    return (
        <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <PlantWhisperers />
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                <Container className={appStyles.Content}>
                    <PlantWhisperers mobile />
                    <Plant {...plant.results[0]} setPlants={setPlant} plantPage />
                    <br />
                </Container>
            </Col>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Image className="position-fixed" src="https://res.cloudinary.com/ejdiamo/image/upload/v1674561489/hanging-plant_q9kptl.png" alt='hanging plant' />
            </Col>
        </Row>
    )
}

export default PlantPage;