import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

const View = props => (
    <div className="user_like">
        <a>
            <img src={require(`../../../${props.src}`)} alt={props.alt} />
        </a>
    </div>
);

@inject('Views')
@observer
export default class Views extends Component {
    componentWillMount() {
        this.props.Views.push();
    }

    View() {
        let views = this.props.Views.ViewDB, arr = [];
        for (let view of views) {
            arr.push(
                <View
                    key={view.userId}
                    src={view.photo}
                    alt={view.login}
                />);
        }
        return arr;
    }

    render() {
        return (
            <div className="likes_views">
                {this.View()}
            </div>
        );
    }
}