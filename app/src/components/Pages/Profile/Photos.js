import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {fetchPost} from "../../../fetch";

@inject('Photo')
@inject('Profile')
@inject('User')
@observer
export default class Photos extends Component {

    componentWillMount() {
        this.props.User.push();
        this.props.Photo.push();
    }

    isPhoto(photo, name) {
        let className = (name === 'one') ? 'first' : '';
        return (
            <div className={`photo ${className}`}>
                {photo ?
                <div>
                    {photo.match(/http/) && <img src={photo} alt={name} />}
                    {!photo.match(/http/) && <img src={require(`../../../${photo}`)} alt={name}/>}
                    <i
                        className="fas fa-times"
                        onClick={() => this.delPhoto(name)}
                    ></i>
                </div>
                :
                    <div style={{width: 40, height: 40}}>
                        <i className="fas fa-plus" style={{zIndex: 1}}></i>
                        <input
                             type="file"
                             accept="image/jpg, image/png"
                             name="newPhoto"
                             style={{outline: 'none', width: '100%', height: '100%', zIndex: 2, cursor: 'pointer', opacity: 0}}
                             onChange={(e) => {
                                 this.addPhoto(e)
                             }}
                        />
                    </div>
                }
            </div>
        );

    }

    addPhoto(e) {
        let file = e.target.files[0];
        if (e.target.files[0] && e.target.files[0].size < 1000000) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.props.Photo.newPhoto = e.target.result;
                this.props.Photo.addPhoto();
            }
        }
        else if (e.target.files[0]) {
            this.props.Profile.popupText = 'Too large photo';
            this.props.Profile.popup = true;
        }
    }

    delPhoto(element) {
        this.props.Photo[element] = '';
        if (this.props.Photo.one === '') {
            this.props.Photo.one = this.props.Photo.two;
            this.props.Photo.two = this.props.Photo.three;
            this.props.Photo.three = this.props.Photo.four;
            this.props.Photo.four = this.props.Photo.five;
            this.props.Photo.five = '';
        }
        else if (this.props.Photo.two === '') {
            this.props.Photo.two = this.props.Photo.three;
            this.props.Photo.three = this.props.Photo.four;
            this.props.Photo.four = this.props.Photo.five;
            this.props.Photo.five = '';
        }
        else if (this.props.Photo.three === '') {
            this.props.Photo.three = this.props.Photo.four;
            this.props.Photo.four = this.props.Photo.five;
            this.props.Photo.five = '';
        }
        else if (this.props.Photo.four === '') {
            this.props.Photo.four = this.props.Photo.five;
            this.props.Photo.five = '';
        }
        let params = `1=${this.props.Photo.one}&2=${this.props.Photo.two
        }&3=${this.props.Photo.three}&4=${this.props.Photo.four}&5=${this.props.Photo.five}`;
        fetchPost('editPhotos', params);
    }

    render() {
        return (
            <div id="profile_photos">
                <div style={{alignItems: 'flex-end', flexWrap: 'wrap'}}>
                    {this.isPhoto(this.props.Photo.one, 'one')}
                    {this.isPhoto(this.props.Photo.two, 'two')}
                </div>
                <div style={{flexWrap: 'wrap'}}>
                    {this.isPhoto(this.props.Photo.three, 'three')}
                    {this.isPhoto(this.props.Photo.four, 'four')}
                    {this.isPhoto(this.props.Photo.five, 'five')}
                </div>
            </div>
        );
    }
}