import {observable, action} from 'mobx';
import React from 'react';
import UserProfile from '../Pages/Profile/UserProfile';
// import Photos from '../Pages/Profile/Photos';

class ProfileStore {

    @observable content = <UserProfile />;
    // @observable content = <Photos />;


    @action contentChange = (newContent) => {
        this.content = newContent;
    };

}

const Profile = new ProfileStore();
export default Profile;