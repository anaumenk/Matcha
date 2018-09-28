import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('User')
@inject('Photo')
@observer
export default class UserProfile extends Component {
    getAge() {
        let year = this.props.User.birthYear,
            month = this.props.User.birthMonth,
            day = this.props.User.birthDay,
            date = `${year}-${month}-${day}`;
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    tagList() {
        let array = [];
        let tags = this.props.User.tags.split(',');
        let i = 0;
        for (let tag of tags) {
            array.push(
                <div
                    className={"new_tag"}
                    key={i++}
                >
                    #{tag}
                </div>
            )
        }
        return array;
    }

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
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>{firstName} {lastName}, {this.getAge()}</p>
                    <p>{orientation}, {gender}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Occupation:</span> {occupation}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Biography:</span> {biography}</p>
                    <div className="tags" style={{width: 350, marginTop: 10}}>
                        <p className="name">Tags</p>
                        <div className="tag_list">
                            {this.tagList()}
                        </div>
                    </div>
                    <p style={{fontWeight: 'bold'}}>Rating <span style={{color: '#179b77'}}>{rating}</span></p>
                </div>

            </div>
        );
    }
}