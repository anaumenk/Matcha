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
import Likes from './components/store/LikesStore';
import Chat from './components/store/ChatStore';
import Search from './components/store/SearchStore';
import Register from './components/store/RegisterStore';
import Prew from './components/store/PrewProfileStore';

ReactDOM.render((
    <Provider
        Login={Login}
        User={User}
        Photo={Photo}
        Profile={Profile}
        Views={Views}
        Likes={Likes}
        Chat={Chat}
        Search={Search}
        Register={Register}
        Prew={Prew}
    >
        <App />
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
