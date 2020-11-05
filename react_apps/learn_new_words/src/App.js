import React from 'react'
import './App.css';
import {auth} from "./firebase";

import {useAuthState} from "react-firebase-hooks/auth";

import SignIn from "./components/SignIn";
import Main from "./components/Main";

import Container from "react-bootstrap/Container";


function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <section>
          <Container className='mt-4'>
              {user ? <Main/> : <SignIn/>}
          </Container>
      </section>
    </div>
  );
}

export default App;
