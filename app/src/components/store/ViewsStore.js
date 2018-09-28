import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class ViewsStore {
    @observable ViewDB = [];

    @action push() {
        fetchPost('views', `userId=${localStorage.getItem('userId')}`).then(response => {
            let array = JSON.parse(response);
            console.log(array);
            // this.one = array[0][1];
            // this.currPhoto = this.one;
            // this.two = array[0][2];
            // this.three = array[0][3];
            // this.four = array[0][4];
            // this.five = array[0][5];
        });
    }
}

const Views = new ViewsStore();
export default Views;