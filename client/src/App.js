import React from 'react';
import Admin from './components/Admin';

import {Route, Switch} from 'react-router-dom'
import Invite from "./components/Invite";

function App() {
    return(
        <Switch>
            <Route path='/Invite/:userId' component={Invite}/>
            <Route exact path='/Admin' component={Admin}/>
        </Switch>
    );
}

export default App;
