import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('User')
@observer
class Tags extends Component {
    render() {
        return (
            this.props.User.tags.map(tag => {
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
        let {
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

        let {
            currPhoto,
            one,
            two,
            three,
            four,
            five
        } = this.props.Photo;

        return (
            <div id="user_profile">
                {one &&
                    <div className="user_profile_photo">
                        <img src={require(`../../../${currPhoto}`)} alt={login}/>
                        {
                            one !== currPhoto
                            && <i className="fas fa-arrow-left" onClick={() => this.PhotoLeft()}></i>

                        }
                        {
                            ((one === currPhoto && two)
                            || (two === currPhoto && three)
                            || (three === currPhoto && four)
                            || (four === currPhoto && five))
                            && <i className="fas fa-arrow-right" onClick={() => this.PhotoRight()}></i>
                        }
                    </div>
                }
                <div id="user_profile_info">
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>{firstName} {lastName}, {age}</p>
                    <p>{orientation}, {gender}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Occupation:</span> {occupation}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Biography:</span> {biography}</p>
                    <div className="tags">
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