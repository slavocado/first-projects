import React from 'react'
import './App.css';
import {projectFirestore, auth} from "./firebase";

import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <section>
        {/*{user ? <MainPage/> : <SignIn/>}*/}
          {user ? <SignOut/> : <SignIn/>}
      </section>
    </div>
  );
}

export default App;
