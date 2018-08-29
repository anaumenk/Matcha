import React, { Component } from 'react';

import Setting from './Setting';
import Views from './Views';
import Likes from './Likes';
import Chat from './Chat';
import Photos from './Photos';
import UserProfile from './UserProfile';

export default class Profile extends Component {
    state = {
        content: <UserProfile />,
    };

    changeColor(e) {
        let nav = document.getElementsByClassName('nav');
        for (let element of nav) {
            element.style.color = 'rgba(19, 35, 47, 0.9)';
        }
        e.target.style.color = '#179b77';
    }

    contentChange = (component) => {
        this.setState({content: component});
    };

    render() {
        const {content} = this.state;

        return (
            <main>
                <div className="nav_panel">
                    <ul id="profile_nav">
                        <li><a className="nav" onClick={(e) => {
                            this.contentChange(<UserProfile />);
                            this.changeColor(e);
                        }}>Profile</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.contentChange(<Setting />);
                            this.changeColor(e);
                        }}>Edit profile</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.contentChange(<Photos />);
                            this.changeColor(e);
                        }}>Photos</a></li>

                        <li><a className="nav" onClick={(e) => {
                            this.contentChange(<Views />);
                            this.changeColor(e);
                        }}>Views</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.contentChange(<Likes />);
                            this.changeColor(e);
                        }}>Likes</a></li>
                        <li><a className="nav" onClick={(e) => {
                            this.contentChange(<Chat />);
                            this.changeColor(e);
                        }}>Chat</a></li>
                    </ul>

                </div>
                <div className="content">
                    {content}
                </div>
            </main>
        );
    }
}