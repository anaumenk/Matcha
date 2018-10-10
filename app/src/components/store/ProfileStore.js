import {observable, action} from 'mobx';
import React from 'react';
import UserProfile from '../Pages/Profile/UserProfile';
import PrewProfile from '../Pages/PrewProfile';
import {fetchPost} from "../../fetch";
// import Views from "../Pages/Profile/Views";

class ProfileStore {

    @observable content = <UserProfile />;
    // @observable content = <Views />;
    @observable popup = false;
    @observable popupText = '';
    @observable style = 'none';
    @observable profile = '';

    @action contentChange = (newContent) => {
        this.content = newContent;
    };

    @action openUserProfile = (userId) => {
        fetchPost('prewUser', `userId=${userId}`).then(response => {
            let userInfo = JSON.parse(response);
            // console.log(userInfo);
            this.profile = <PrewProfile userInfo={userInfo} />
        });
    };

    @action blockUser(whom, who) {
        fetchPost('blockUser', `who=${who}&whom=${whom}`);
    }

    @action likeUser(whom, who) {
        fetchPost('likeUser', `who=${who}&whom=${whom}`);
    }

    @action unLikeUser(whom, who) {
        fetchPost('unLikeUser', `who=${who}&whom=${whom}`);
    }

}

const Profile = new ProfileStore();
export default Profile;