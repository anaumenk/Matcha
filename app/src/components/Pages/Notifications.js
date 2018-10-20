import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('Profile')
@observer
class Notific extends Component {
    render() {
        return (
            this.props.Profile.notifications.map(note => {
                return (
                    <div
                        className="news"
                        key={note.id}
                    >
                        <div className="news_img">
                            {note.photo && <img src={require(`../../${note.photo}`)} alt={note.lastName}/>}
                        </div>
                        <div style={{width: '60%'}}>
                            <p>{`${note.firstName} ${note.lastName}`}</p>
                            <p>{`${note.text}`}</p>
                        </div>

                    </div>
                );

            })
        );
    }
}

@inject('Profile')
@inject('User')
@observer
export default class Notifications extends Component {

    componentWillMount() {
        this.props.User.push();
        this.props.Profile.notification(this.props.User.userId);
    }

    render() {
        return (
            <div id="notifications">
                <Notific />
                {this.props.Profile.notifications.length > 0 ?
                    <button
                        className="button"
                        style = {{marginTop: 10}}
                        onClick={() => {
                                this.props.Profile.clearNotifications();
                                this.props.Profile.notification();
                            }
                        }
                    >Clear</button> :
                    <p id="noNotif">No notifications</p>
                }
            </div>
        );
    }
}