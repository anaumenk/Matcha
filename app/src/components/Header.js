import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

@inject('Login')
@inject('Profile')
@inject('User')
@observer
export default class Header extends Component {
    componentWillMount() {
        if (this.props.Login.isAuthenticated) {
            this.props.Profile.notification(this.props.User.userId);
        }
    }

    render() {
        const {notificationCount} = this.props.Profile;
        const {isAuthenticated} = this.props.Login;

        return (
            <header>
                <div id="header">
                    <Link to="/">Matcha</Link>
                </div>
                {isAuthenticated &&
                    <div id="nav">
                        <ul>
                            <li><Link to="/notifications">Notifications</Link><sup
                                style={{color: '#1ab188', fontWeight: 'bold'}}>{notificationCount > 0 && notificationCount}</sup></li>
                            <li><Link to="/">Profile</Link></li>
                            <li><Link to="/search">Search profiles</Link></li>
                            <li><Link to="/findMatches">Find matches</Link></li>
                            <li><a
                                onClick={() => this.props.Login.LogOut()}>Log out</a></li>
                        </ul>
                    </div>
                }
            </header>
        );
    }
}