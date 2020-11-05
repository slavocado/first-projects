import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { projectFirestore} from "../firebase";

function EditModal({wordData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newName, setNewName] = useState(wordData.name);
    const [newTranslation, setNewTranslation] = useState(wordData.translation);
    const [newTranscription, setNewTranscription] = useState(wordData.transcription);

    const word = projectFirestore.collection('words').doc(wordData.id);

    const updateData = async (e) => {

        await word.update({
            name: newName,
            translation: newTranslation,
            transcription: newTranscription,
        })

        handleClose()
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow} className='mr-2'>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing word: {wordData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasic1">
                        <Form.Label>Word</Form.Label>
                        <Form.Control type="text" placeholder="Word" value={newName}
                                      onChange={e => setNewName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasic2">
                        <Form.Label>Translation</Form.Label>
                        <Form.Control type="text" placeholder="Word translation" value={newTranslation}
                                      onChange={e => setNewTranslation(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasic3">
                        <Form.Label>Transcription</Form.Label>
                        <Form.Control type="text" placeholder="Word transcription" value={newTranscription}
                                      onChange={e => setNewTranscription(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModal