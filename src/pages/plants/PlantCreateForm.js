import React, { useRef, useState } from 'react'
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap'

import styles from "../../styles/PostPlantCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import Asset from "../../components/Asset";
import Upload from '../../assets/upload.png'
import { useHistory } from 'react-router-dom';
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from '../../hooks/useRedirect';

function PlantCreateForm() {
    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});

    const [plantData, setPlantData] = useState({
        plant_name: "",
        plant_type: "",
        image: "",
        age: "",
        about: "",
    });
    const { plant_name, plant_type, image, age, about } = plantData;

    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setPlantData({
            ...plantData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPlantData({
                ...plantData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };
    // Function to handle form submission sending data to the API
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('plant_name', plant_name)
        formData.append('plant_type', plant_type)
        formData.append('image', imageInput.current.files[0])
        formData.append('age', age)
        formData.append('about', about)

        try {
            const { data } = await axiosReq.post('/plants/', formData);
            history.push(`/plants/${data.id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    const plantFields = (
        <div className='text-center'>
            <Form.Group>
                <Form.Label className="d-none">Plant Name</Form.Label>
                <Form.Control
                    type="text"
                    name="plant_name"
                    placeholder='Plant name'
                    value={plant_name}
                    onChange={handleChange}
                    className={appStyles.Input}
                />
            </Form.Group>
            {errors?.plant_name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label className="d-none">Plant Type</Form.Label>
                <Form.Control as="select" name="plant_type" value={plant_type} onChange={handleChange} className={appStyles.Input}>
                    <option value="palms">Palms</option>
                    <option value="ferns">Ferns</option>
                    <option value="indoor_trees">Indoor Trees</option>
                    <option value="cacti_and_succulents">Cacti and Succulents</option>
                    <option value="hydroculture">Hydroculture</option>
                    <option value="foliage plants">Foliage plants</option>
                    <option value="bonsai">Bonsai</option>
                </Form.Control>
            </Form.Group>
            {errors?.plant_type?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label className="d-none">Age</Form.Label>
                <Form.Control
                    type="text"
                    name="age"
                    placeholder='Age'
                    value={age}
                    onChange={handleChange}
                    className={appStyles.Input}
                />
            </Form.Group>
            {errors?.age?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label className="d-none">About</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="about"
                    placeholder='A bit about your plant ...'
                    value={about}
                    onChange={handleChange}
                    className={appStyles.Textarea}

                />
            </Form.Group>
            {errors.about?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button className={`${btnStyles.Button}`} type="submit">
                Create
            </Button>
            <Button className={`${btnStyles.Button}`} onClick={() => history.goBack()}>
                Cancel
            </Button>
        </div>
    );
    return (

        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                        <div className={`${appStyles.Content} text-center mb-2`} >
                            <strong>Show off your plants!</strong>
                        </div>
                    <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
                        <Form.Group className='text-center'>
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} btn`}
                                            htmlFor='image-upload'
                                        >
                                            Replace image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className='d-flex justify-content-center'
                                    htmlFor='image-upload'>
                                    <Asset src={Upload} message="Click to upload an image" />
                                </Form.Label>
                            )}
                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className='d-md-none'>{plantFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={`${appStyles.Content} ${styles.Container}`}>
                        {plantFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PlantCreateForm;