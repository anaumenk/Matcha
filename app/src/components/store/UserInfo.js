import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class UserInfo {
    @observable firstName = '';
    @observable lastName = '';
    login = '';
    @observable email = '';
    @observable password = '';
    @observable orientation = '';
    @observable gender = '';
    @observable occupation = '';
    @observable biography = '';
    @observable birthDay = '';
    @observable birthMonth = '';
    @observable birthYear = '';
    @observable latitude = '';
    @observable longitude = '';
    @observable tags = '';
    @observable rating = '';
    @observable siteColor = '';
    @observable siteLanguage = '';

    @action push() {
        fetchPost('user', `userId=${localStorage.getItem('userId')}`).then(response => {
            let array = JSON.parse(response);
            this.firstName = array[0]['firstName'];
            this.lastName = array[0]['lastName'];
            this.login = array[0]['login'];
            this.email = array[0]['email'];
            this.password = array[0]['password'];
            this.orientation = array[0]['orientation'];
            this.gender = array[0]['gender'];
            this.occupation = array[0]['occupation'];
            this.biography = array[0]['biography'];
            this.birthDay = array[0]['birthDay'];
            this.birthMonth = array[0]['birthMonth'];
            this.birthYear = array[0]['birthYear'];
            this.latitude = array[0]['latitude'];
            this.longitude = array[0]['longitude'];
            this.tags = array[0]['tags'];
            this.rating = array[0]['rating'];
            this.siteColor = array[0]['siteColor'];
            this.siteLanguage = array[0]['siteLanguage'];
        });
    }
}

const User = new UserInfo();
export default User;