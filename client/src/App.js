import React, { Component } from 'react';
import './css/App.css';
import Admin from './Admin/Admin.js';
import {Route, Switch } from 'react-router-dom'

import Invitation from "./Invitation/Invitation";

class App extends Component {

  render() {
    return (
        <Switch>
            <Route path='/Invitation/' component={Invitation}/>
            <Route exact path='/Admin' component={Admin}/>
        </Switch>
    );
  }
}

export default App;
