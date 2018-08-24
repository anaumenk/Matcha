import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// import {PropTypes} from 'prop-types';

import Notifications from './Pages/Notifications';
import Profile from './Pages/Profile/Profile';
import Research from './Pages/ListOfProfiles';
import Search from './Pages/Search';

export default class RoutesList extends Component {
    // static childContextTypes = {
    //     color: PropTypes.string,
    // }
    //
    // getChildContext() {
    //     return {
    //         color: 'blue',
    //     };
    // }

    render() {
        return (
            <div>
                <Route exact path='/notifications' component={Notifications} />
                <Route exact path='/profile'component={Profile} />
                <Route exact path='/'component={Profile} />
                <Route exact path='/research' component={Research} />
                <Route exact path='/find' component={Search} />
            </div>
        );
    }
}

//exact если не будет '/find/2'