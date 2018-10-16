import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://'+window.location.hostname+':3001');

@inject('Views')
@inject('Prew')
@inject('User')
@observer
class View extends Component {

    componentWillMount() {
        this.props.Views.push();
        this.props.Prew.profile = '';
    }

    render () {
        const {ViewDB} = this.props.Views;
        return (
            ViewDB.map(view => {
                return (
                    <div
                        key={view.userId}
                        className="user_like"
                        onClick={() => {
                            this.props.Prew.openUserProfile(this.props.User.userId, view.userId);
                            socket.emit('notification', view.userId);
                        }}
                    >
                        <a>
                            {view.photo && <img src={require(`../../../${view.photo}`)} alt={view.login} />}
                        </a>
                    </div>
                );
            })
        );
    }
}

@inject('Prew')
@inject('User')
@observer
export default class Views extends Component {

    componentWillMount() {
        this.props.User.push();
    }

    render() {
        return (
            <div className="likes_views">
                <View />
                {this.props.Prew.profile}
            </div>
        );
    }
}