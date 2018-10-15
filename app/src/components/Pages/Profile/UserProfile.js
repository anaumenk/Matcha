import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('User')
@observer
class Tags extends Component {
    render() {
        const {tags} = this.props.User;
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

@inject('User')
@inject('Photo')
@observer
export default class UserProfile extends Component {
    componentWillMount() {
        this.props.User.push();
        this.props.Photo.push();
    }

    PhotoRight() {
        let newPhoto = this.props.Photo.currPhoto;
        if (this.props.Photo.currPhoto === this.props.Photo.one) {
            if (this.props.Photo.two) {
                newPhoto = this.props.Photo.two;
            }
        }
        else if (this.props.Photo.currPhoto === this.props.Photo.two) {
            if (this.props.Photo.three) {
                newPhoto = this.props.Photo.three;
            }
        }
        else if (this.props.Photo.currPhoto === this.props.Photo.three) {
            if (this.props.Photo.four) {
                newPhoto = this.props.Photo.four;
            }
        }
        else if (this.props.Photo.currPhoto === this.props.Photo.four) {
            if (this.props.Photo.five) {
                newPhoto = this.props.Photo.five;
            }
        }
        this.props.Photo.currPhoto = newPhoto;
    }

    PhotoLeft() {
        let newPhoto = this.props.Photo.currPhoto;
        if (this.props.Photo.currPhoto === this.props.Photo.five) {
            newPhoto = this.props.Photo.four;
        }
        else if (this.props.Photo.currPhoto === this.props.Photo.four) {
            newPhoto = this.props.Photo.three;
        }
        else if (this.props.Photo.currPhoto === this.props.Photo.three) {
            newPhoto = this.props.Photo.two;
        }
        else if (this.props.Photo.currPhoto === this.props.Photo.two) {
            newPhoto = this.props.Photo.one;
        }
        this.props.Photo.currPhoto = newPhoto;
    }

    render() {
        const {
            firstName,
            lastName,
            login,
            orientation,
            gender,
            occupation,
            biography,
            rating,
            age
        } = this.props.User;

        return (
            <div id="user_profile">
                {this.props.Photo.one &&
                    <div className="user_profile_photo">
                        <img src={require(`../../../${this.props.Photo.currPhoto}`)} alt={login}/>
                        <i className="fas fa-arrow-right" onClick={() => this.PhotoRight()}></i>
                        <i className="fas fa-arrow-left" onClick={() => this.PhotoLeft()}></i>
                    </div>
                }
                <div id="user_profile_info">
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>{firstName} {lastName}, {age}</p>
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