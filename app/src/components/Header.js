import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {socket} from "../App";

@inject('Profile')
@inject('User')
@observer
export default class Header extends Component {

    constructor(props) {
        super(props);
        socket.on('new notification', this._qwe);
    }

    _qwe = async (notif) => {
        if (notif === this.props.User.userId) {
            this.props.Profile.notification();
        }
    };

    componentWillMount() {
        if (this.props.User.isAuthenticated) {
            this.props.Profile.notification();
        }
    }

    render() {
        return (
            <header>
                <div id="header">
                    <Link to="/">Matcha</Link>
                </div>
                {this.props.User.isAuthenticated &&
                    <div id="nav">
                        <ul>
                            <li><Link to="/notifications">Notifications</Link><sup id="notifSup"
                                style={{color: '#1ab188', fontWeight: 'bold'}}>{this.props.Profile.notificationCount > 0 && this.props.Profile.notificationCount}</sup></li>
                            <li><Link to="/">Profile</Link></li>
                            <li><Link to="/search">Search profiles</Link></li>
                            <li><Link to="/findMatches">Find matches</Link></li>
                            <li><a
                                onClick={() => this.props.User.LogOut()}>Log out</a></li>
                        </ul>
                    </div>
                }
            </header>
        );
    }
}