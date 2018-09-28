import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'mobx-react';
import Login from './components/store/LoginSignup';
import User from './components/store/UserInfo';
import Photo from './components/store/UserPhotos';
import Profile from './components/store/ProfileStore';
import Views from './components/store/ViewsStore';

ReactDOM.render((
    <Provider Login={Login} User={User} Photo={Photo} Profile={Profile} Views={Views}>
             <App />
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
