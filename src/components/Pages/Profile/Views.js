import React, { Component } from 'react';

const ViewDB = [
    {
        id: 0,
        src: require('../../../images/test.jpg'),
        name: 'name',
    },
    {
        id: 1,
        src: require('../../../images/01.jpg'),
        name: 'name2',
    },
    {
        id: 2,
        src: require('../../../images/01.jpg'),
        name: 'name3',
    },
    {
        id: 3,
        src: require('../../../images/01.jpg'),
        name: 'name4',
    },
    {
        id: 4,
        src: require('../../../images/01.jpg'),
        name: 'name5',
    },
    {
        id: 5,
        src: require('../../../images/01.jpg'),
        name: 'name6',
    },
    {
        id: 6,
        src: require('../../../images/01.jpg'),
        name: 'name7',
    },
    {
        id: 7,
        src: require('../../../images/01.jpg'),
        name: 'name8',
    },
];

const View = props => (
    <div className="user_like">
        <a>
            <img src={props.src} alt={props.name} />
        </a>
    </div>
);


export default class Views extends Component {
    render() {
        return (
            <div className="likes_views">
                {
                    ViewDB.map(like =>
                        <View
                            key={like.id}
                            src={like.src}
                            alt={like.name}
                        />
                    )
                }
            </div>
        );
    }
}