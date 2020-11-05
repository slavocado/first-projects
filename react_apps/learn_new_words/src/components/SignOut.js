import React from 'react'

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from "firebase/app";

function SignOut (){
    const signOut = () => {
        firebase.auth().signOut().then(function() {
            alert('signed out')
        }).catch(function(error) {
            console.log(error.message)
        });
    }

    return(
        <Button onClick={signOut} className='mr-2'>Sign out</Button>
    )
}

export default SignOut