import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            notification: '10',
            isAuthenticated: this.props.isAuthenticated,
        };
    }

    Logout= () => {
        this.setState({isAuthenticated:false});
        // ????
    };

    // static contextTypes = {
    //     color: PropTypes.string,
    // }

    render() {
        // console.log(this.context.color);

        const {
            isAuthenticated,
            notification,
        } = this.state;

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
                            <li><a onClick={this.Logout}>Log out</a></li>
                        </ul>
                    </div>
                }
            </header>
        );
    }
}