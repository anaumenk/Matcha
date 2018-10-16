import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {fetchPost} from "../../fetch";
import openSocket from 'socket.io-client';

const socket = openSocket('http://'+ window.location.hostname +':3001');

@inject('Prew')
@observer
class Tags extends Component {
    render() {
        const {tags} = this.props.Prew;
        return (
            tags.map(tag => {
                return (
                    <div
                        className={"new_tag"}
                        key={tag.tagId}
                    >
                        {`#${tag.text}`}
                    </div>
                );
            })
        );
    }
}

@inject('Profile')
@inject('Photo')
@inject('User')
@inject('Prew')
@inject('Chat')
@inject('Likes')
@observer
export default class PrewProfile extends Component {
    state = {
        likeUnlike: !this.props.User.ifInLike(this.props.Prew.userId) ? this.Like() : this.Unlike(),
        blockBlocked: !this.props.User.ifInBlock(this.props.Prew.userId) ? this.Block() : <button className='redButton'>Blocked</button>,
    };

    componentWillMount() {
        this.props.Chat.pushFriends();
    }

    Block() {
        return (
            <button
                className='redButton'
                onClick={() => {
                     this.props.Prew.blockUser(this.props.Prew.userId, this.props.User.userId);
                     this.props.Prew.openUserProfile(this.props.User.userId, this.props.Prew.userId);
                     for (let friend of this.props.Chat.friends) {
                         if (friend['userId'] === this.props.Prew.userId) {
                             socket.emit('notification', this.props.Prew.userId);
                             this.props.Prew.openUserProfile(this.props.User.userId, this.props.Prew.userId);
                         }
                     }
                    this.setState({blockBlocked: <button className='redButton'>Blocked</button>});
                }}
            >Block</button>
        );
    }

    Like() {
        return (
            <button
                className='greenButton'
                onClick={() => {
                     if (this.props.Photo.one) {
                         let i = 0;
                         for (let friend of this.props.Chat.friends) {
                             if (friend['userId'] === this.props.Prew.userId) {
                                 i++;
                                 return ;
                             }
                         }
                         for (let block of this.props.User.blocked) {
                             if (block['userId'] === this.props.Prew.userId) {
                                 i++;
                                 return ;
                             }
                         }
                         if (i === 0) {
                             socket.emit('notification', this.props.Prew.userId);
                         }
                         this.props.Prew.likeUser(this.props.Prew.userId, this.props.User.userId);
                         this.props.Prew.openUserProfile(this.props.User.userId, this.props.Prew.userId);
                         i = 0;
                         for (let block of this.props.User.blocked) {
                             if (block['userId'] === this.props.Prew.userId) {
                                 i++;
                                 return ;
                             }
                         }
                         if (i === 0) {
                             socket.emit('notification', this.props.Prew.userId);
                         }
                         this.setState({likeUnlike: this.Unlike()});
                     }
                     else {
                         this.props.Profile.popupText = 'You must have at least one picture to like other users';
                         this.props.Profile.popup = true;
                     }
                }}
            >Like</button>
        );
    }

    Unlike() {
        return (
            <button
                className='redButton'
                onClick={() => {
                    this.props.Prew.unLikeUser(this.props.Prew.userId, this.props.User.userId);
                    this.props.User.push();
                    for (let friend of this.props.Chat.friends) {
                         if (friend['userId'] === this.props.Prew.userId) {
                            socket.emit('notification', this.props.Prew.userId);
                            this.props.Chat.pushFriends();
                        }
                    }
                    this.props.Prew.openUserProfile(this.props.User.userId, this.props.Prew.userId);
                    this.setState({likeUnlike: this.Like()});
                }}
            >Unlike</button>
        );
    }

    PhotoRight() {
        this.props.Prew.newPhoto = this.props.Prew.currPhoto;
        if (this.props.Prew.currPhoto === this.props.Prew.photoOne && this.props.Prew.photoTwo) {
            this.props.Prew.newPhoto = this.props.Prew.photoTwo;
        }
        else if (this.props.Prew.currPhoto === this.props.Prew.photoTwo && this.props.Prew.photoThree) {
            this.props.Prew.newPhoto = this.props.Prew.photoThree;
        }
        else if (this.props.Prew.currPhoto === this.props.Prew.photoThree && this.props.Prew.photoFour) {
            this.props.Prew.newPhoto = this.props.Prew.photoFour;
        }
        else if (this.props.Prew.currPhoto === this.props.Prew.photoFour && this.props.Prew.photoFive) {
            this.props.Prew.newPhoto = this.props.Prew.photoFive;
        }
        this.props.Prew.currPhoto = this.props.Prew.newPhoto;
    }

    PhotoLeft() {
        this.props.Prew.newPhoto = this.props.Prew.currPhoto;
        if (this.props.Prew.currPhoto === this.props.Prew.photoFive) {
            this.props.Prew.newPhoto = this.props.Prew.photoFour;
        }
        else if (this.props.Prew.currPhoto === this.props.Prew.photoFour) {
            this.props.Prew.newPhoto = this.props.Prew.photoThree;
        }
        else if (this.props.Prew.currPhoto === this.props.Prew.photoThree) {
            this.props.Prew.newPhoto = this.props.Prew.photoTwo;
        }
        else if (this.props.Prew.currPhoto === this.props.Prew.photoTwo) {
            this.props.Prew.newPhoto = this.props.Prew.photoOne;
        }
        this.props.Prew.currPhoto = this.props.Prew.newPhoto;
    }

    age() {
        let date = this.props.Prew.birth;
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    render() {
        const {
            userId,
            currPhoto,
            login,
            firstName,
            lastName,
            orientation,
            gender,
            occupation,
            biography,
            rating,
            connection
        } = this.props.Prew;

        return (
            <div
                id="user_profile"
                style={{
                    position: 'absolute',
                    right:0,
                    left:0,
                    margin: 'auto',
                    backgroundColor: 'rgba(19, 35, 47, 1)',
                    boxShadow: '0 0 10px rgba(19, 35, 47, 0.9)',
                    color: '#aba6a1',
                }}
            >
                <div id="profileConnection">
                    <p>
                        {connection}
                    </p>
                    <div>
                        <i
                            className="fas fa-times"
                            onClick={() => this.props.Prew.profile = ''}
                        ></i>
                    </div>
                </div>
                <div className='profileButtons'>
                    <button
                        className='redButton'
                        onClick={() => {
                            fetchPost('fakeUser', `who=${this.props.User.userId}&whom=${userId}`).then(response => {
                                let array = JSON.parse(response);
                                if (array['error']) {
                                   this.props.Profile.popupText = 'Already clicked';
                                   this.props.Profile.popup = true;
                                }
                            });
                            this.props.Prew.openUserProfile(this.props.User.userId, userId);
                        }}
                    >Fake</button>
                    {this.state.blockBlocked}
                    {this.state.likeUnlike}
                </div>
                {currPhoto &&
                <div className="user_profile_photo">
                    <img src={require(`../../${currPhoto}`)} alt={login}/>
                    <i className="fas fa-arrow-right" onClick={() => this.PhotoRight()}></i>
                    <i className="fas fa-arrow-left" onClick={() => this.PhotoLeft()}></i>
                </div>
                }
                <div id="user_profile_info" style={{paddingLeft: 10}}>
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>{firstName} {lastName}, {this.age()}</p>
                    <p>{orientation}, {gender}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Occupation:</span> {occupation}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Biography:</span> {biography}</p>
                    <div className="tags" style={{width: 350, marginTop: 10}}>
                        <p className="name">Tags</p>
                        <div className="tag_list">
                            <Tags />
                        </div>
                    </div>
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>Rating <span style={{color: '#179b77'}}>{rating}</span></p>
                </div>
            </div>
        );
    }
}