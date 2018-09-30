import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

const Like = props => (
    <div className="user_like">
        <a>
            <img src={require(`../../../${props.src}`)} alt={props.alt} />
        </a>
    </div>
);

@inject('Likes')
@observer
export default class Likes extends Component {
    componentWillMount() {
        this.props.Likes.push();
    }

    Like() {
        let likes = this.props.Likes.LikeDB, arr = [];
        for (let like of likes) {
            arr.push(
                <Like
                    key={like.userId}
                    src={like.photo}
                    alt={like.login}
                />);
        }
        return arr;
    }

    render() {
        return (
            <div className="likes_views">
                {this.Like()}
            </div>
        );
    }
}