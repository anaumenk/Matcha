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
import {fetchGet} from "./fetch";

// import myStore from './components/store/store'
// import {inject, observer} from 'mobx-react';

// @inject('myStore')
// @observer

class App extends Component {
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const user = this.user.value;
    //     if (user !== '') {
    //         this.props.myStore.addUser(user);
    //
    //     }
    //     this.user.value = '';
    // };

    state = {
        isAuthenticated: fetchGet('authenticated'),
    };

    render() {
        const {isAuthenticated} = this.state;
        // const {myStore} = this.props;
        console.log(isAuthenticated);
        return (
            <Router>
                <div>
                {/*<p>Users: {myStore.userCount}</p>*/}
                {/*<p>Users: {myStore.sql}</p>*/}

                {/*<form onSubmit={e => this.handleSubmit(e)}>*/}
                    {/*<input type="text" placeholder="Enter user" ref={input => this.user = input} />*/}
                    {/*<button>Add user</button>*/}
                {/*</form>*/}
                {/*/!*<p>{myStore.users}</p>*!/*/}
                {/*/!*{myStore.addUser('Name2')}*!/*/}
                {/*/!*<p>{myStore.users}</p>*!/*/}

                {/*<ul>*/}
                    {/*{myStore.users.map(user => (*/}
                        {/*<li key={user}>*/}
                            {/*{user}*/}
                        {/*</li>*/}
                    {/*)*/}
                    {/*)}*/}
                {/*</ul>*/}


                <Header isAuthenticated={isAuthenticated}/>
                {
                isAuthenticated
                ? <RoutesList />
                : <Form />
                }
                <Footer />

            </div>
            </Router>
        );
    }
}

export default App;



// import {observer} from 'mobx-react';
// import {action, observable} from 'mobx';
//
// const styles = {
//     fontFamily: 'sans-serif',
//     textAlign: 'center',
// };
//
// const somebody = ['first', 'second', 'third'];
// const randomName = () => somebody[Math.floor(Math.random() * somebody.length)];
//
// const Hello = props => <h2>Hello {props.name}</h2>;
//
// @observer
// class App extends Component {
//     timerId;
//     @observable name = 'nobody';
//     @action
//     setName = () => {
//         this.name = randomName();
//     };
//     componentDidMount() {
//         this.timerId = setInterval(this.setName, 1000);
//     }
//     componentWillUnmount() {
//         clearInterval(this.timerId);
//     }
//     render() {
//         return (
//             <div style={styles}>
//                 <Hello name={this.name} />
//             </div>
//         );
//     }
// }

