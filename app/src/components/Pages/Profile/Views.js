import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {socket} from "../../../App";

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
        return (
            this.props.Views.ViewDB.map(view => {
                return (
                    <div
                        key={view.userId}
                        className="user_like"
                        onClick={() => {
                            this.props.Prew.profile = '';
                            this.props.Prew.openUserProfile(this.props.User.userId, view.userId);
                            this.props.Prew.getViewed(view.userId);
                            socket.emit('notification', view.userId);
                        }}
                    >
                        <a>
                            {(view.photo && view.photo.match(/http/)) && <img src={view.photo} alt={view.login} />}
                            {(view.photo && !view.photo.match(/http/)) && <img src={require(`../../../${view.photo}`)} alt={view.login} />}
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