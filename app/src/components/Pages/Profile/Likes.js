import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Likes')
@inject('Prew')
@inject('User')
@observer
class Like extends Component {

    componentWillMount() {
        this.props.Likes.push();
        this.props.Prew.profile = '';
    }

    render () {
        const {LikeDB} = this.props.Likes;
        return (
            LikeDB.map(like => {
                return (
                    <div
                        key={like.userId}
                        className="user_like"
                        onClick={() => this.props.Prew.openUserProfile(this.props.User.userId, like.userId)}
                    >
                        <a>
                            {like.photo && <img src={require(`../../../${like.photo}`)} alt={like.login} />}
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
export default class Likes extends Component {

    componentWillMount() {
        this.props.User.push();
    }

    render() {
        return (
            <div className="likes_views">
                <Like />
                {this.props.Prew.profile}
            </div>
        );
    }
}