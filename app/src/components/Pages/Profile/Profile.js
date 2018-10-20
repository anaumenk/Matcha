import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import Setting from './Setting';
import Views from './Views';
import Likes from './Likes';
import Chat from './Chat';
import Photos from './Photos';
import UserProfile from './UserProfile';
import {Popup} from "./Setting";
import Friends from "./Friends";

@inject('Profile')
@observer
export default class Profile extends Component {
    changeColor(e) {
        let nav = document.getElementsByClassName('nav');
        for (let element of nav) {
            element.style.color = 'rgba(19, 35, 47, 0.9)';
        }
        e.target.style.color = '#179b77';
    }

    render() {
        return (
            <main>
                <div className="nav_panel">
                    <ul id="profile_nav">
                        <li><a className="nav" onClick={(e) => {
                            this.props.Profile.contentChange(<UserProfile />);
                            this.changeColor(e);
                        }}>Profile</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.props.Profile.contentChange(<Setting />);
                            this.changeColor(e);
                        }}>Edit profile</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.props.Profile.contentChange(<Friends />);
                            this.changeColor(e);
                        }}>Friends</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.props.Profile.contentChange(<Photos />);
                            this.changeColor(e);
                        }}>Photos</a></li>

                        <li><a className="nav" onClick={(e) => {
                            this.props.Profile.contentChange(<Views />);
                            this.changeColor(e);
                        }}>Views</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.props.Profile.contentChange(<Likes />);
                            this.changeColor(e);
                        }}>Likes</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.props.Profile.contentChange(<Chat />);
                            this.changeColor(e);
                        }}>Chat</a></li>
                    </ul>

                </div>
                <div className="content">
                    {this.props.Profile.content}
                    {this.props.Profile.popup && <Popup />}
                </div>
            </main>
        );
    }
}