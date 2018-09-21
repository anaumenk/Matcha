import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

@inject('myStore')
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: '10',
        }
    }

    render() {
        const {notification} = this.state;
        const {isAuthenticated} = this.props.myStore;

        return (
            <header>
                <div id="header">
                    <Link to="/">Matcha</Link>
                </div>
                {isAuthenticated &&
                    <div id="nav">
                        <ul>
                            <li><Link to="/notifications">Notifications</Link><sup
                                style={{color: '#1ab188', fontWeight: 'bold'}}>{notification}</sup></li>
                            <li><Link to="/">Profile</Link></li>
                            <li><Link to="/research">Search profiles</Link></li>
                            <li><Link to="/find">Find matches</Link></li>
                            <li><a onClick={() => this.props.myStore.LogOut()}>Log out</a></li>
                        </ul>
                    </div>
                }
            </header>
        );
    }
}