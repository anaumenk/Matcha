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

const Notific = props => (
    <div className="news">
        <div className="news_img"><img src={props.src} alt={props.alt} /></div>
        <p>{props.notification}</p>
    </div>
);

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