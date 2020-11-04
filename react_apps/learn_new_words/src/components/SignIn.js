import React from 'react'

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from "firebase/app";
import {auth} from "../firebase";

function SignIn (){
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            let user = result.user;
            console.log(user)
        }).catch(function(error) {
            console.log(error.message)
        });
    }

    return(
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    )
}

export default SignIn