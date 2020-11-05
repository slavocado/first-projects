import React from "react";


function Word (props) {
    const {name, translation, transcription } = props.wordData

    return(
        <>
            <h2>{name}</h2>
            <h5>{translation}</h5>
            <h5>{transcription}</h5>
        </>
    )
}

export default Word