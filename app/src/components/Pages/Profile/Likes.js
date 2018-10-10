import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Likes')
@inject('Profile')
@observer
class Like extends Component {

    componentWillMount() {
        this.props.Likes.push();
        this.props.Profile.profile = '';
    }

    render () {
        const {LikeDB} = this.props.Likes;
        return (
            LikeDB.map(like => {
                return (
                    <div
                        key={like.userId}
                        className="user_like"
                        onClick={() => this.props.Profile.openUserProfile(like.userId)}
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

@inject('Profile')
@observer
export default class Likes extends Component {
    render() {
        return (
            <div className="likes_views">
                <Like />
                {this.props.Profile.profile}
            </div>
        );
    }
}