import {observable, action} from 'mobx';
import {fetchPost} from "../../fetch";

class ChatStore {
    @observable friends = [];
    @observable messages = [];
    @observable newMessage = '';
    @observable friendId = '';

    @action pushFriends() {
        fetchPost('friendsList', `userId=${localStorage.getItem('userId')}`).then(response => {
            this.friends = JSON.parse(response);
        });
    }

    @action selectUser() {
        if (this.friendId) {
            fetchPost('selectChat', `userId=${localStorage.getItem('userId')}&friendId=${this.friendId}`).then(response => {
                this.messages = JSON.parse(response);
            });
        }
    }

    @action sendMessage() {
        fetchPost('sendMessage',`userId=${localStorage.getItem('userId')}&friendId=${this.friendId}&message=${this.newMessage}`);
    }
}

const Chat = new ChatStore();
export default Chat;