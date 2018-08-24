import React, { Component } from 'react';

const LikeDB = [
    {
        id: 0,
        src: require('../../../images/test.jpg'),
        whoName: 'name',
    },
    {
        id: 1,
        src: require('../../../images/01.jpg'),
        whoName: 'name2',
    }
]

class Like extends Component {
    render() {
        const {
            src,
            whoName,
        } = this.props;
        return (
            <div className="user_like">
                <a>
                    <img src={src} alt={whoName} />
                </a>
            </div>
        );
    }
}

export default class Likes extends Component {
    render() {
        return (
            <div className="likes_views">
                {
                    LikeDB.map(like =>
                        <Like
                            key={like.id}
                            src={like.src}
                            alt={like.whoName}
                        />
                    )
                }
            </div>
        );
    }
}