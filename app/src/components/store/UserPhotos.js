import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class UserPhotos {
    @observable currPhoto = '';
    @observable newPhoto = '';
    @observable one = '';
    @observable two = '';
    @observable three = '';
    @observable four = '';
    @observable five = '';

    @action push() {
        fetchPost('photo', `userId=${localStorage.getItem('userId')}`).then(response => {
            let array = JSON.parse(response);
            this.one = array[0][1];
            this.currPhoto = this.one;

            this.two = array[0][2];
            this.three = array[0][3];
            this.four = array[0][4];
            this.five = array[0][5];
        });
    }

    @action addPhoto() {
        let photoId = this.one === '' ? 1 : (this.two === '' ? 2 :
            (this.three === '' ? 3 : (this.four === '' ? 4 : 5))),
            params = `userId=${localStorage.getItem('userId')}&newPhoto=${this.newPhoto}&photoId=${photoId}`;
        fetchPost('addPhoto', params);
    }
}

const Photo = new UserPhotos();
export default Photo;