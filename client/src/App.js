import React from 'react';
import './css/App.css';
import Admin from './Admin/Admin.js';
import {Route, Switch} from 'react-router-dom'

import Invitation from "./Invitation/Invitation";

function App() {
    return(
        <Switch>
            <Route path='/Invitation/' component={Invitation}/>
            <Route exact path='/Admin' component={Admin}/>
        </Switch>
    );
}

export default App;
