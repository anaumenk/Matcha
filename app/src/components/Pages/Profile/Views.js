import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Views')
@inject('Profile')
@observer
class View extends Component {

    componentWillMount() {
        this.props.Views.push();
        this.props.Profile.profile = '';
    }

    render () {
        const {ViewDB} = this.props.Views;
        return (
            ViewDB.map(view => {
                return (
                    <div
                        key={view.userId}
                        className="user_like"
                        onClick={() => this.props.Profile.openUserProfile(view.userId)}
                    >
                        <a>
                            {view.photo && <img src={require(`../../../${view.photo}`)} alt={view.login} />}
                        </a>
                    </div>
                );
            })
        );
    }
}

@inject('Profile')
@observer
export default class Views extends Component {
    render() {
        return (
            <div className="likes_views">
                <View />
                {this.props.Profile.profile}
            </div>
        );
    }
}