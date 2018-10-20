import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class ChatStore {
    @observable friends = [];
    @observable messages = [];
    @observable newMessage = '';
    @observable friendId = '';
    @observable friendPhoto = '';
    @observable friendLogin = '';
    @observable friendFirstName = '';
    @observable friendLastName = '';


    @action pushFriends() {
        fetchPost('friendsList', '').then(response => {
            this.friends = JSON.parse(response);
        });
    }

    @action selectUser() {
        if (this.friendId) {
            fetchPost('selectChat', `friendId=${this.friendId}`).then(response => {
                this.messages = JSON.parse(response);
            });
        }
    }

    @action sendMessage() {
        fetchPost('sendMessage',`friendId=${this.friendId}&message=${this.newMessage}`);
    }

    @action ifInFriends(userId) {
        for (let i = 0; i < this.friends.length; i++) {
            if (this.friends[i]['userId'] === userId) {
                return true;
            }
        }
        return false;
    }
}

const Chat = new ChatStore();
export default Chat;