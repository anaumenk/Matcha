import React, { Component } from 'react';
import Setting from './Setting';
import Views from './Views';
import Likes from './Likes';
import Chat from './Chat';
import Photos from './Photos';
import UserProfile from './UserProfile';

export default class Profile extends Component {
    constructor () {
        super();
        this.state = {
            content: <UserProfile />,
        };
        this.contentChange = this.contentChange.bind(this);
    }

    changeColor(element) {
        let nav = document.getElementsByClassName('nav');
        for(let i = 0, length = nav.length; i < length; i++) {
            nav[i].style.color = 'rgba(19, 35, 47, 0.9)';
        }
        let elem = document.getElementsByClassName(element);
        for(let j = 0, length = elem.length; j < length; j++) {
            elem[j].style.color = '#179b77';
        }
    }

    contentChange(component) {
        this.setState({content: component});
    }

    render() {
        const {content} = this.state;

        return (
            <main>
                <div className="nav_panel">
                    <ul id="profile_nav">
                        <li><a className="nav f" onClick={() => {
                            this.contentChange(<UserProfile />);
                            this.changeColor('f');
                        }}>Profile</a></li>
                        <li><a className="nav a" onClick={() => {
                            this.contentChange(<Setting />);
                            this.changeColor('a');
                        }}>Edit profile</a></li>
                        <li><a className="nav b" onClick={() => {
                            this.contentChange(<Photos />);
                            this.changeColor('b');
                        }}>Photos</a></li>

                        <li><a className="nav c" onClick={() => {
                            this.contentChange(<Views />);
                            this.changeColor('c');
                        }}>Views</a></li>
                        <li><a className="nav d" onClick={() => {
                            this.contentChange(<Likes />);
                            this.changeColor('d');
                        }}>Likes</a></li>
                        <li><a className="nav e" onClick={() => {
                            this.contentChange(<Chat />);
                            this.changeColor('e');
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