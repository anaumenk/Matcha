import {observable, action} from 'mobx';
import React from 'react';
import UserProfile from '../Pages/Profile/UserProfile';
// import PrewProfile from '../PrewProfile';
import {fetchPost} from "../../fetch";

class ProfileStore {

    @observable content = <UserProfile />;
    @observable popup = false;
    @observable style = 'none';
    // @observable profile = '';

    @action contentChange = (newContent) => {
        this.content = newContent;
    };

    @action openUserProfile = (userId) => {
        fetchPost('prewUser', `userId=${userId}`).then(response => {
            let userInfo = JSON.parse(response);
            // console.log(userInfo);
            // this.profile = <PrewProfile userInfo={userInfo} />
        });
    };

}

const Profile = new ProfileStore();
export default Profile;