import {observable, action} from 'mobx';
import React from 'react';
import UserProfile from '../Pages/Profile/UserProfile';
import {fetchPost} from "../../fetch";

class ProfileStore {

    @observable content = <UserProfile />;

    @observable popup = false;
    @observable popupText = '';
    @observable firstNameStyle = 'none';
    @observable lastNameStyle = 'none';
    @observable emailStyle = 'none';
    @observable occupationStyle = 'none';
    @observable biographyStyle = 'none';
    @observable newLocationStyle = 'none';
    @observable notificationCount = '';
    @observable notifications = [];

    @action contentChange = (newContent) => {
        this.content = newContent;
    };

    @action notification(userId) {
        fetchPost('notification', `userId=${userId}`).then(response => {
           if (response !== 'TypeError: Failed to fetch') {
                this.notifications = JSON.parse(response);
                this.notificationCount = this.notifications.length;
            }
            else {
                localStorage.setItem('userId', '');
            }
        });
    }

    @action clearNotifications(userId) {
        fetchPost('clearNotification', `userId=${userId}`);
    }

}

const Profile = new ProfileStore();
export default Profile;