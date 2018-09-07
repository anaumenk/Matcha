import React, { Component } from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';


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

// import Notifications from './components/Pages/Notifications';
// import Profile from './components/Pages/Profile/Profile';
// import Research from './components/Pages/ListOfProfiles';
// import Search from './components/Pages/Search';


export default class App extends Component {
    state = {
        isAuthenticated: true,
    };

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


// export default class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             isAuthenticated: false,
//         }
//     }
//
//     render() {
//         const {isAuthenticated} = this.state;
//
//         return (
//             <Router>
//                 <div>
//                     <Header />
//                     {
//                         !isAuthenticated ? <Route exact path='/' component={Form} /> : <Route exact path="/" component={Profile} />
//                     }
//
//
//                     <Route exact path="/notifications" component={Notifications} />
//                     <Route exact path="/research" component={Research} />
//                     <Route exact path="/find" component={Search} />
//                     <Footer />
//                 </div>
//             </Router>
//         );
//     }
// }
