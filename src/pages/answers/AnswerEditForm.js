import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from "../../styles/AnswerCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

function AnswerEditForm(props) {
    const { id, content, setShowEditForm, setAnswers } = props;
    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/answers/${id}`, {
                content: formContent.trim(),
            });
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                results: prevAnswers.results.map((answer) => {
                    return answer.id === id
                        ? {
                            ...answer,
                            content: formContent.trim(),
                            updated_at: "now",
                        }
                        : answer;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='pr-1'>
                <Form.Control
                    className={styles.AnswerForm}
                    as="textarea"
                    value={formContent}
                    rows={2}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className='text-right'>
                <button
                    className={`${btnStyles.Button}`}
                    disabled={!content.trim()}
                    type="submit"
                >
                    Save
                </button>
                <button
                    className={`${btnStyles.Button} ${btnStyles.Margin}`}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    Cancel
                </button>
            </div>
        </Form>
    );
}

export default AnswerEditForm;