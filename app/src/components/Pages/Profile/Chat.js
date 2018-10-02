import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Chat')
@observer
class SendMessage extends Component {
    handleChange = (e) =>{
        this.props.Chat.newMessage = e.target.value;
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.props.Chat.sendMessage(this.props.Chat.newMessage, this.props.Chat.friendId);
            this.props.Chat.newMessage = '';
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
                    value={newMessage}
                    onChange={this.handleChange}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
        );
    }
}

const Messages = props => (
    <div id="message_form">
        {props.messages.map(message => {
            return (
                <div key={message.id} className={message.senderId === localStorage.getItem('userId') ? 'message_user' : 'message_other'} >
                    <p>{message.text}</p>
                </div>
            )
        })}
    </div>
);

@inject('Chat')
@observer
export default class Chat extends Component {
    selectUser = (e, userId) => {
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
    };

    componentWillMount() {
        this.props.Chat.pushFriends();
    }

    friendsList() {
        let friends = this.props.Chat.friends,
            array = [];
        for (let friend of friends) {
            array.push(
                <div key={friend.userId} className="chat_user" onClick={(e) => this.selectUser(e, friend.userId)}>
                    <div className="chat_user_image">
                        <img src={require(`../../../${friend.photo}`)} alt={friend.login} />
                    </div>
                    <p>{friend.login}</p>
                </div>
            );
        }
        return array;
    }

    render() {
        return (
            <div id="chat">
                <div id="list_of_people">
                    {this.friendsList()}
                </div>
                <div id="messages">
                    <Messages messages={this.props.Chat.messages}/>
                    <SendMessage />
                </div>
            </div>
        );
    }
}