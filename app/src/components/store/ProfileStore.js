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

    @action notification() {
        fetchPost('notification', '').then(response => {
           if (response !== 'TypeError: Failed to fetch') {
                this.notifications = JSON.parse(response);
                this.notificationCount = this.notifications.length;
            }
            else {
                localStorage.setItem('userId', '');
            }
        });
    }

    @action clearNotifications() {
        fetchPost('clearNotification', '');
    }

    @action clearStyles() {
        this.firstNameStyle = 'none';
        this.lastNameStyle = 'none';
        this.emailStyle = 'none';
        this.occupationStyle = 'none';
        this.biographyStyle = 'none';
        this.newLocationStyle = 'none';
    }
}

const Profile = new ProfileStore();
export default Profile;