import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {socket} from "../../../App";


@inject('Chat')
@inject('User')
@inject('Prew')
@observer
class Friend extends Component {

    componentWillMount() {
        this.props.Chat.pushFriends();
        this.props.Prew.profile = '';
    }

    render () {
        return (
            this.props.Chat.friends.map(friend => {
                return (
                    <div
                        key={friend.userId}
                        className="user_like"
                        onClick={() => {
                            this.props.Prew.profile = '';
                            this.props.Prew.openUserProfile(this.props.User.userId, friend.userId);
                            this.props.Prew.getViewed(friend.userId);
                            socket.emit('notification', friend.userId);
                        }}
                    >
                        <a>
                            {(friend.photo && friend.photo.match(/http/)) && <img src={friend.photo} alt={friend.login} />}
                            {(friend.photo && !friend.photo.match(/http/)) && <img src={require(`../../../${friend.photo}`)} alt={friend.login} />}
                        </a>
                    </div>
                );
            })
        )
    }
}

@inject('Prew')
@inject('User')
@observer
export default class Friends extends Component {

    componentWillMount() {
        this.props.User.push();
    }

    render() {
        return (
            <div className="likes_views">
                <Friend />
                {this.props.Prew.profile}
            </div>
        );
    }
}