import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

import styles from "../../styles/PostsPage.module.css";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import Plant from './Plant';
import Asset from '../../components/Asset';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import PlantWhisperers from '../profiles/PlantWhisperers';

function PlantsPage({ filter = "", message }) {
    const [plants, setPlants] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const { data } = await axiosReq.get(`/plants/?${filter}search=${query}`)
                setPlants(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        };
        setHasLoaded(false)
        const timer = setTimeout(() => {
            fetchPlants();
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [filter, query, pathname]);

    return (
        <Row className='h-100'>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <PlantWhisperers />
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                <PlantWhisperers mobile />
                <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
                <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        type="text"
                        className="mr-sm-2"
                        placeholder='Search plants'
                        value={query}
                        onChange={(event) => setQuery(event.target.value)} />
                </Form>
                {hasLoaded ? (
                    <>
                        {plants.results.length ? (
                            <InfiniteScroll
                                children={plants.results.map((plant) => (
                                    <Plant key={plant.id} {...plant} setPlants={setPlants} />
                                ))
                                }
                                dataLength={plants.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!plants.next}
                                next={() => fetchMoreData(plants, setPlants)}
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col className='d-none d-lg-block p-0 p-lg-2' lg={3}>
                <Image className="position-fixed" src="https://res.cloudinary.com/ejdiamo/image/upload/v1674561489/hanging-plant_q9kptl.png" alt='hanging plant' />
            </Col>
        </Row>
    )
}

export default PlantsPage;