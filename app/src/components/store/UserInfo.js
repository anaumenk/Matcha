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
    @observable birth = '';
    @observable birthDay = '';
    @observable birthMonth = '';
    @observable birthYear = '';
    @observable age = '';
    @observable latitude = '';
    @observable longitude = '';
    @observable tags = '';
    @observable rating = '';
    @observable siteColor = '';
    @observable siteLanguage = '';

    @observable newTag = '';

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
            this.birth = array[0]['birth'];
            this.birthData(this.birth);
            this.latitude = array[0]['latitude'];
            this.longitude = array[0]['longitude'];
            this.tags = array[0]['tags'];
            console.log(this.tags);
            this.rating = array[0]['rating'];
            this.siteColor = array[0]['siteColor'];
            this.siteLanguage = array[0]['siteLanguage'];
        });
    }

    @action birthData(data) {
        let array = data.split('-');
        this.birthYear = array[0];
        this.birthMonth = array[1] | 0;
        this.birthDay = array[2] | 0;
        this.age = ((new Date().getTime() - new Date(data)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    @action removeTag = (tagForDel) => {
        let array = '';
        tagForDel = tagForDel.replace('#', '');
        let tags = this.tags.split(',');
        for (let tag of tags) {
            if (tag !== tagForDel) {
                array += ',' + tag;
            }
        }
        this.tags = array;
    };

    @action saveChanges() {
        const {
            firstName,
            lastName,
            email,
            orientation,
            gender,
            occupation,
            biography,
            birthDay,
            birthMonth,
            birthYear,
            siteColor,
            tags,
            // latitude,
            // longitude,
            // tags,
            // map,
        } = this;

        let params = `userId=${localStorage.getItem('userId')}&firstName=${firstName}&lastName=${lastName}
        &email=${email}&orientation=${orientation}&gender=${gender}
        &occupation=${occupation}&biography=${biography}
        &birth=${birthYear}-${birthMonth}-${birthDay}
        &tags=${tags}
        &siteColor=${siteColor}`;
        fetchPost('editInfo', params);
    }
}

const User = new UserInfo();
export default User;