import React from "react";

import SignOut from "./SignOut";
import DataList from "./DataList";
import AddWord from "./AddWord";

function Main () {
    return(
        <div>
            <SignOut/>
            <AddWord/>
            <DataList/>
        </div>
    )
}

export default Main