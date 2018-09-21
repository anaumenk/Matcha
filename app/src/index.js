import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'mobx-react';
import myStore from './components/store/store';

ReactDOM.render((
    <Provider myStore={myStore}>
             <App />
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
