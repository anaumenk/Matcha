import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class UserInfo {
    @observable userId = localStorage.getItem('userId') ? localStorage.getItem('userId').split('.')[2] : '';
    @observable firstName = '';
    @observable lastName = '';
    @observable login = '';
    @observable email = '';
    @observable password = '';
    @observable orientation = '';
    @observable gender = '';
    @observable occupation = '';
    @observable biography = '';
    @observable birth = '';
    @observable age = '';

    @observable latitude = '';
    @observable longitude = '';

    @observable rating = '';
    @observable siteColor = '';
    @observable siteLanguage = '';

    @observable newTag = '';
    @observable tags = [];
    @observable blocked = '';
    @observable liked = '';

    @observable locationChecked = '';
    @observable newLocation = '';

    @observable isAuthenticated = localStorage.getItem('userId') !== '';


    @action push() {
        fetchPost('user', '').then(response => {
            if (response !== 'TypeError: Failed to fetch') {
                let array = JSON.parse(response);
                if (array[0].length !== 0) {
                    this.firstName = array[0]['firstName'];
                    this.lastName = array[0]['lastName'];
                    this.login = array[0]['login'];
                    this.email = array[0]['email'];
                    this.password = array[0]['password'];

                    this.orientation = array[0]['orientation'];
                    this.gender = array[0]['gender'];


                    this.locationChecked = array[0]['locationChecked'] === '1';
                    this.occupation = array[0]['occupation'];
                    this.biography = array[0]['biography'];
                    this.birth = array[0]['birth'];
                    this.age = ((new Date().getTime() - new Date(this.birth)) / (24 * 3600 * 365.25 * 1000)) | 0;
                    this.latitude = array[0]['latitude'];
                    this.longitude = array[0]['longitude'];
                    this.rating = array[0]['rating'];
                    this.blocked = array[1];
                    this.liked = array[2];
                    this.tags = array[3];
                }
                else {
                    this.forceLogOut();
                }
            }
            else {
                this.forceLogOut();
            }

        });
    }

    @action ifInBlock(userId) {
        for (let i = 0; i < this.blocked.length; i++) {
            if (this.blocked[i]['blocked'] === userId) {
                return true;
            }
        }
        return false;
    }

    @action ifInLike(userId) {
        for (let i = 0; i < this.liked.length; i++) {
            if (this.liked[i]['liked'] === userId) {
                return true;
            }
        }
        return false;
    }

    @action birthData(date) {
        if (date) {
            // let array = date.split('-');
            // this.birthYear = array[0];
            // this.birthMonth = array[1] | 0;
            // this.birthDay = array[2] | 0;

        }
    }

    @action removeTag = (tagForDel) => {
        tagForDel = tagForDel.substring(1, tagForDel.length);
        fetchPost('delTag', `tagForDel=${tagForDel}`);
    };

    @action addNewTag() {
        fetchPost('newTag', `newTag=${this.newTag}`).then(response => {
            this.tags = JSON.parse(response);
        });
        this.newTag = '';
    }

    @action saveChanges() {
        let {
            firstName,
            lastName,
            email,
            orientation,
            gender,
            occupation,
            biography,
            birth,
            latitude,
            longitude,
            locationChecked,
        } = this,
            checker = locationChecked === true ? '1' : '0',
            params = `firstName=${firstName}&lastName=${lastName
        }&email=${email}&orientation=${orientation}&gender=${gender
        }&occupation=${occupation}&biography=${biography
        }&birth=${birth
        }&latitude=${latitude}&longitude=${longitude
        }&locationChecked=${checker}`;
        console.log(params);
        fetchPost('editInfo', params);
    }

    @action getNewLocation() {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${
            this.newLocation}&sensor=false&language=en&key=AIzaSyAqLNucodvPuxX_30MWoh6g1YT6hWnvzS4`)
            .then(response => {
                return response.text();
        }).then(response => {
            let array = JSON.parse(response);
            if (array.results[0]) {
                this.latitude = array.results[0].geometry.location.lat;
                this.longitude = array.results[0].geometry.location.lng;
            }
        });
    }

    @action LogIn = (userId) => {
        userId = `${Math.floor(Math.random() * 101)}.${Date.now()}.${userId}`;
        localStorage.setItem('userId', userId);
        this.isAuthenticated = true;
    };

    @action LogOut() {
        fetchPost('changeConnection', `userId=${localStorage.getItem('userId')}`);
        localStorage.setItem('userId', '');
        this.isAuthenticated = false;
    };

    @action forceLogOut() {
        localStorage.setItem('userId', '');
        this.isAuthenticated = false;
    }
}

const User = new UserInfo();
export default User;