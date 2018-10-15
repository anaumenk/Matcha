import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

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
        const {friends} = this.props.Chat;
        return (
            friends.map(friend => {
                return (
                    <div
                        key={friend.userId}
                        className="user_like"
                        onClick={() => this.props.Prew.openUserProfile(this.props.User.userId, friend.userId)}
                    >
                        <a>
                            {friend.photo && <img src={require(`../../../${friend.photo}`)} alt={friend.login} />}
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