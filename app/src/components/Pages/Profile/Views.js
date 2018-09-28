import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

const View = props => (
    <div className="user_like">
        <a>
            <img src={props.src} alt={props.name} />
        </a>
    </div>
);

@inject('Views')
@observer
export default class Views extends Component {
    render() {
        const {ViewDB} = this.props.Views;

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