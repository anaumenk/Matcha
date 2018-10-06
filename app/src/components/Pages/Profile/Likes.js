import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Likes')
@observer
class Like extends Component {

    componentWillMount() {
        this.props.Likes.push();
    }

    render () {
        const {LikeDB} = this.props.Likes;
        return (
            LikeDB.map(like => {
                return (
                    <div key={like.userId} className="user_like">
                        <a>
                            {like.photo && <img src={require(`../../../${like.photo}`)} alt={like.login} />}
                        </a>
                    </div>
                );
            })
        )
    }
}

export default class Likes extends Component {
    render() {
        return (
            <div className="likes_views">
                <Like />
            </div>
        );
    }
}