import React, { Component } from 'react';

const News = [
    {
        id:0,
        src: require('../../images/test.jpg'),
        alt: 'name',
        notification: 'User send you a message',
    },
    {
        id:1,
        src: require('../../images/test.jpg'),
        alt: 'name2',
        notification: 'User liked your photo',
    },
];

class Notific extends Component {
    render() {
        const {
            src,
            alt,
            notification,
        } = this.props;

        return (
            <div className="news">
                <div className="news_img"><img src={src} alt={alt} /></div>
                <p>{notification}</p>
            </div>
        );
    }
}

export default class Notifications extends Component {
    render() {
        return (
            <div id="notifications">
                {
                    News.map(notific =>
                        <Notific
                            key={notific.id}
                            src={notific.src}
                            alt={notific.alt}
                            notification={notific.notification}
                        />
                    )
                }
            </div>
        );
    }
}