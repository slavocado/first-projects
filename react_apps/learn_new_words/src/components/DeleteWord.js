import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {projectFirestore} from "../firebase";

function DeleteWord ({wordData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const word = projectFirestore.collection('words').doc(wordData.id);

    const sendData = async (e) => {

       word.delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        handleClose()
    }

    return(
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you shure?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={sendData}>
                        Yes, delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteWord