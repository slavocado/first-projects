import React from "react";
import Row from "react-bootstrap/Row";
import EditModal from "./EditModal";
import DeleteWord from "./DeleteWord";


function Word(props) {
    const {name, translation, transcription, id} = props.wordData

    return (
        <>
            <Row className='justify-content-between'>
                <h2>{name}</h2>
                <div>
                    <EditModal wordData={{name, translation, transcription, id}}/>
                    <DeleteWord wordData={{name, translation, transcription, id}}/>
                </div>
            </Row>
            <h5>{translation}</h5>
            <h5>{transcription}</h5>
        </>
    )
}

export default Word