import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Chat')
@observer
class FriendsList extends Component {
    selectUser = (e, userId) => {
        if (this.props.Chat.friendId !== userId) {
            let elements = document.getElementsByClassName('chat_user');
            for(let i = 0, length = elements.length; i < length; i++) {
                elements[i].style.backgroundColor = '#c1bdba';
            }
            if (e.target.className === 'chat_user') {
                e.target.style.backgroundColor = '#aba6a1';
            }
            else if (e.target.parentNode.className === 'chat_user_image') {
                e.target.parentNode.parentNode.style.backgroundColor = '#aba6a1';
            }
            else {
                e.target.parentNode.style.backgroundColor = '#aba6a1';
            }
            document.getElementById('messages').style.display = 'unset';
            this.props.Chat.friendId = userId;
            this.props.Chat.selectUser();
        }
        else {
            let elements = document.getElementsByClassName('chat_user');
            for(let i = 0, length = elements.length; i < length; i++) {
                elements[i].style.backgroundColor = '#c1bdba';
            }
            document.getElementById('messages').style.display = 'none';
            this.props.Chat.friendId = '';
        }

    };

    render() {
        const {friends} = this.props.Chat;
        return (
            <div id="list_of_people">
                {friends.map(friend => {
                    return (
                        <div key={friend.userId} className="chat_user" onClick={(e) => this.selectUser(e, friend.userId)}>
                            <div className="chat_user_image">
                                {friend.photo && <img src={require(`../../../${friend.photo}`)} alt={friend.login} />}
                            </div>
                            <p>{friend.firstName} {friend.lastName}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

@inject('Chat')
@observer
class SendMessage extends Component {
    handleChange = (e) =>{
        this.props.Chat.newMessage = e.target.value;
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (this.props.Chat.newMessage.match(/[0-9A-Za-z]/)) {
                this.props.Chat.sendMessage(this.props.Chat.newMessage, this.props.Chat.friendId);
                this.props.Chat.newMessage = '';
                this.props.Chat.selectUser();
            }
            else {
                this.props.Chat.newMessage = '';
                this.props.Chat.selectUser();
            }
        }
    };

    render() {
        const {
            newMessage,
        } = this.props.Chat;

        return (
            <div id="send_message">
                <input
                    type="text"
                    id="m"
                    placeholder="Type your message"
                    value={newMessage}
                    onChange={this.handleChange}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
        );
    }
}

@inject('Chat')
@observer
class Messages extends Component {

    componentWillMount() {
        this.props.Chat.pushFriends();
    }

    render() {
        const {messages} = this.props.Chat;
        return (
            <div id="message_form">
                    {messages.map(message => {
                        return (
                            <div key={message.id}
                                 className={message.senderId === localStorage.getItem('userId') ? 'message_user' : 'message_other'}>
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
                    <SendMessage />
                    <Messages />
                </form>
            </div>
        );
    }
}