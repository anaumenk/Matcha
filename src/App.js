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

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: true,
        }
    }

    render() {
        const {isAuthenticated} = this.state;

        return (
            <div>
                <Header isAuthenticated={isAuthenticated} />
                {
                    isAuthenticated
                    ? <RoutesList />
                    : <Form />
                }
                <Footer />
            </div>
        );
    }
}
