import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'mobx-react';
import Login from './components/store/LoginSignup';
import User from './components/store/UserInfo';
import Photo from './components/store/UserPhotos'

ReactDOM.render((
    <Provider Login={Login} User={User} Photo={Photo}>
             <App />
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
