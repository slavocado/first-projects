import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import {auth, projectFirestore} from "../firebase";

function AddWord () {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValueName, setFormValueName] = useState('');
    const [formValueTranslation, setFormValueTranslation] = useState('');
    const [formValueTranscription, setFormValueTranscription] = useState('');

    const wordsRef = projectFirestore.collection('words');

    const sendData = async (e) => {
        const {uid} = auth.currentUser;

        await wordsRef.add({
            name: formValueName,
            translation: formValueTranslation,
            transcription: formValueTranscription,
            uid
        })

        handleClose()

        setFormValueName('');
        setFormValueTranslation('');
        setFormValueTranscription('');
    }

    return(
        <>
            <Button variant="warning" onClick={handleShow}>
                Add word
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new word</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasic1">
                        <Form.Label>Word</Form.Label>
                        <Form.Control type="text" placeholder="Word" value={formValueName}
                                      onChange={e => setFormValueName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasic2">
                        <Form.Label>Translation</Form.Label>
                        <Form.Control type="text" placeholder="Word translation" value={formValueTranslation}
                                      onChange={e => setFormValueTranslation(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasic3">
                        <Form.Label>Transcription</Form.Label>
                        <Form.Control type="text" placeholder="Word transcription" value={formValueTranscription}
                                      onChange={e => setFormValueTranscription(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendData}>
                        Add word
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddWord