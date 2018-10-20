import React, { Component } from 'react';

import './css/index.css';
import './css/log_sig.css';
import './css/profile.css';
import './css/notifications.css';
import './css/ListofProfiles.css';
import './css/views_likes.css';
import './css/chat.css';
import './css/setting.css';
import './css/photos.css';
import './css/user_profile.css'


import Form from './components/LoginSignup/Form';
import Header from './components/Header';
import Footer from './components/Footer';

import RoutesList from './components/Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import openSocket from 'socket.io-client';
export const socket = openSocket('http://'+window.location.hostname+':3001');

@inject('User')
@observer
export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                <Header />
                {
                    this.props.User.isAuthenticated
                    ? <RoutesList />
                    : <Form />
                }
                <Footer />
            </div>
            </Router>
        );
    }
}