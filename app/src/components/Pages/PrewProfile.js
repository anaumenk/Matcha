import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {fetchPost} from "../../fetch";

@inject('Profile')
@inject('User')
@inject('Photo')
@observer
export default class PrewProfile extends Component {
    state = {
        currPhoto: this.props.userInfo[1][1],
        likeUnlike: !this.props.User.ifInLike(this.props.userInfo[0]['userId']) ? this.Like() : this.Unlike(),
        blockBlocked: !this.props.User.ifInBlock(this.props.userInfo[0]['userId']) ? this.Block() : <button className='redButton'>Blocked</button>,
    };

    Block() {
        return (
            <button
                className='redButton'
                onClick={() => {
                    this.props.Profile.blockUser(this.props.userInfo[0]['userId'], this.props.User.userId);
                    this.props.Profile.openUserProfile(this.props.userInfo[0]['userId']);
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
                        this.props.Profile.likeUser(this.props.userInfo[0]['userId'], this.props.User.userId);
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
                    this.props.Profile.unLikeUser(this.props.userInfo[0]['userId'], this.props.User.userId);
                    this.setState({likeUnlike: this.Like()});
                }}
            >Unlike</button>
        );
    }

    tagList() {
        let array = [];
        let i = 0;
        if (this.props.userInfo[0]['tags']) {
            let tags = this.props.userInfo[0]['tags'].split(',');
            for (let tag of tags) {
                array.push(
                    <div
                        className={"new_tag"}
                        key={i++}
                    >
                        {`#${tag}`}
                    </div>
                )
            }
        }
        return array;
    }


    PhotoRight() {
        let newPhoto = this.state.currPhoto;
        if (this.state.currPhoto === this.props.userInfo[1][1]) {
            if (this.props.userInfo[1][2]) {
                newPhoto = this.props.userInfo[1][2];
            }
        }
        else if (this.state.currPhoto === this.props.userInfo[1][2]) {
            if (this.props.userInfo[1][3]) {
                newPhoto = this.props.userInfo[1][3];
            }
        }
        else if (this.state.currPhoto === this.props.userInfo[1][3]) {
            if (this.props.userInfo[1][4]) {
                newPhoto = this.props.userInfo[1][4];
            }
        }
        else if (this.state.currPhoto === this.props.userInfo[1][4]) {
            if (this.props.userInfo[1][5]) {
                newPhoto = this.props.userInfo[1][5];
            }
        }
        this.setState({
            currPhoto: newPhoto,
        });
    }

    PhotoLeft() {
        let newPhoto = this.state.currPhoto;
        if (this.state.currPhoto === this.props.userInfo[1][5]) {
            newPhoto = this.props.userInfo[1][4];
        }
        else if (this.state.currPhoto === this.props.userInfo[1][4]) {
            newPhoto = this.props.userInfo[1][3];
        }
        else if (this.state.currPhoto === this.props.userInfo[1][3]) {
            newPhoto = this.props.userInfo[1][2];
        }
        else if (this.state.currPhoto === this.props.userInfo[1][2]) {
            newPhoto = this.props.userInfo[1][1];
        }
        this.setState({
            currPhoto: newPhoto,
        });
    }

    age() {
        let date = this.props.userInfo[0]['birth'];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    render() {
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
                <div className='profileButtons'>
                    <div>
                        <button
                            className='redButton'
                            onClick={() => {
                                fetchPost('fakeUser', `who=${this.props.User.userId}&whom=${this.props.userInfo[0]['userId']}`).then(response => {
                                    let array = JSON.parse(response);
                                    if (array['error']) {
                                       this.props.Profile.popupText = 'Already clicked';
                                       this.props.Profile.popup = true;
                                    }
                                });
                                this.props.Profile.openUserProfile(this.props.userInfo[0]['userId']);
                            }}
                        >Fake</button>
                        {this.state.blockBlocked}
                        {this.state.likeUnlike}
                    </div>
                    <i
                        className="fas fa-times"
                        onClick={() => this.props.Profile.profile = ''}
                    ></i>
                </div>
                {this.props.userInfo[1][1] &&
                <div className="user_profile_photo">
                    <img src={require(`../../${this.state.currPhoto}`)} alt={this.props.userInfo[0]['login']}/>
                    <i className="fas fa-arrow-right" onClick={() => this.PhotoRight()}></i>
                    <i className="fas fa-arrow-left" onClick={() => this.PhotoLeft()}></i>
                </div>
                }
                <div id="user_profile_info" style={{paddingLeft: 10}}>
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>{this.props.userInfo[0]['firstName']} {this.props.userInfo[0]['lastName']}, {this.age()}</p>
                    <p>{this.props.userInfo[0]['orientation']}, {this.props.userInfo[0]['gender']}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Occupation:</span> {this.props.userInfo[0]['occupation']}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Biography:</span> {this.props.userInfo[0]['biography']}</p>
                    <div className="tags" style={{width: 350, marginTop: 10}}>
                        <p className="name">Tags</p>
                        <div className="tag_list">
                            {this.tagList()}
                        </div>
                    </div>
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>Rating <span style={{color: '#179b77'}}>{this.props.userInfo[0]['rating']}</span></p>
                </div>
            </div>
        );
    }
}