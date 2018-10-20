import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class ViewsStore {
    @observable ViewDB = [];

    @action push() {
        fetchPost('likesViews', 'action=views').then(response => {
            this.ViewDB = JSON.parse(response);
        });
    }
}

const Views = new ViewsStore();
export default Views;