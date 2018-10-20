import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {socket} from "../../../App";

@inject('Chat')
@observer
class SelectedUser extends Component {

    returnToList() {
        document.getElementById('messages').style.display = 'none';
        document.getElementById('list_of_people').style.display = 'flex';
        this.props.Chat.friendId = '';
    }

    render() {
        let {
            friendLogin,
            friendPhoto,
            friendFirstName,
            friendLastName,
        } = this.props.Chat;

        return (
            <div
                className="chat_user"
                style={{backgroundColor: '#c4bfba'}}
                onClick={() => this.returnToList()}
            >
                <div className="chat_user_image">
                    {friendPhoto && <img src={require(`../../../${friendPhoto}`)} alt={friendLogin} />}
                </div>
                <div style={{marginLeft: 10, width: '60%'}}>
                    <p>{friendFirstName} {friendLastName}</p>
                </div>
            </div>
        );
    }
}

@inject('Chat')
@observer
class FriendsList extends Component {
    selectUser = (e, userId) => {
        document.getElementById('messages').style.display = 'unset';
        document.getElementById('list_of_people').style.display = 'none';
        this.props.Chat.friendId = userId;
        this.props.Chat.selectUser();
    };

    render() {

        return (
            <div id="list_of_people">
                {this.props.Chat.friends.map(friend => {
                    return (
                        <div key={friend.userId}
                             className="chat_user"
                             onClick={(e) => {
                                 this.selectUser(e, friend.userId);
                                 this.props.Chat.friendPhoto = friend.photo;
                                 this.props.Chat.friendLogin = friend.login;
                                 this.props.Chat.friendFirstName = friend.firstName;
                                 this.props.Chat.friendLastName = friend.lastName;
                             }}>
                            <div className="chat_user_image">
                                {friend.photo && <img src={require(`../../../${friend.photo}`)} alt={friend.login} />}
                            </div>
                            <div style={{marginLeft: 10, width: '60%'}}>
                                <p>{friend.firstName} {friend.lastName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

@inject('Chat')
@inject('User')
@observer
class SendMessage extends Component {
    handleChange = (e) =>{
        this.props.Chat.newMessage = e.target.value;
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (this.props.Chat.newMessage.match(/^([a-zа-яё.,() _0-9:;=*!?@#%$^'"]*)$/i)
                && !this.props.Chat.newMessage.match(/^\s+$/)
                && this.props.Chat.newMessage) {
                socket.emit('message', [this.props.User.userId, this.props.Chat.friendId, this.props.Chat.newMessage]);
                socket.emit('notification', this.props.Chat.friendId);
                this.props.Chat.sendMessage(this.props.Chat.newMessage, this.props.Chat.friendId);
            }
            this.props.Chat.newMessage = '';
        }
    };

    render() {
        return (
            <div id="send_message">
                <input
                    type="text"
                    id="m"
                    placeholder="Type your message"
                    value={this.props.Chat.newMessage}
                    onChange={this.handleChange}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
        );
    }
}

@inject('Chat')
@inject('User')
@observer
class Messages extends Component {
    constructor(props) {
        super(props);
        socket.on('new message', this._qwe);
    }

    _qwe = async (msg) => {
        let drug = await this.props.Chat.friendId;
        if ((msg[1] === this.props.User.userId && msg[0] === drug) || (msg[0] === this.props.User.userId && msg[1] === drug)) {
            this.props.Chat.selectUser();
            // this.setState({updated: true});
            // this.forceUpdate();
        }
    };

    componentWillMount() {
        this.props.Chat.pushFriends();
    }

    render() {
        return (
            <div id="message_form">
                    {this.props.Chat.messages.map(message => {
                        return (
                            <div key={message.id}
                                 className={message.senderId === this.props.User.userId ? 'message_user' : 'message_other'}>
                                <p>{message.text}</p>
                            </div>
                        )
                    })}
            </div>);
    }
}
@inject('User')
@observer
export default class Chat extends Component {

    componentWillMount() {
        this.props.User.push();
    }

    render() {
        return (
            <div id="chat">
                <FriendsList />
                <form id="messages" onSubmit={(e) => {e.preventDefault()}} >
                    <SelectedUser />
                    <SendMessage />
                    <Messages />
                </form>
            </div>
        );
    }
}