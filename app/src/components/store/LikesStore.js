import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class LikesStore {
    @observable LikeDB = [];

    @action push() {
        fetchPost('likesViews', 'action=likes').then(response => {
            this.LikeDB = JSON.parse(response);
        });
    }
}

const Likes = new LikesStore();
export default Likes;