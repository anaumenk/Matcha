import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Notifications from './Pages/Notifications';
import Profile from './Pages/Profile/Profile';
// import Research from './Pages/ListOfProfiles';
import Search from './Pages/Search';


export default class RoutesList extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={Profile} />
                <Route exact path='/notifications' component={Notifications} />
                {/*<Route exact path='/research' component={Research} />*/}
                <Route exact path='/find' component={Search} />
                {/*<Route path='/*' component={NotFound} />*/}
            </div>
        );
    }
}

// const NotFound = () => {
//   return(
//       <div>
//           <p>Sorry, wrong page!</p>
//           {/*<img src={require('../images/NotFound.jpg')} style={{height: 200}}/>*/}
//       </div>
//   );
// };