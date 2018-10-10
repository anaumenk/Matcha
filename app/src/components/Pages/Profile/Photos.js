import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {fetchPost} from "../../../fetch";

@inject('Photo')
@inject('Profile')
@observer
export default class Photos extends Component {

    isPhoto(photo, name) {
        let className = (name === 'one') ? 'first' : '';
        return (
            <div className={`photo ${className}`}>
                <img src={require(`../../../${photo}`)} alt={name}/>
                <i
                    className="fas fa-times"
                    onClick={() => this.delPhoto(name)}
                ></i>
            </div>
        );

    }

    noPhoto(name) {
        let className = (name === 'one') ? 'first' : '';
        return (
            <div className={`photo ${className}`}>
                <div style={{width: 40, height: 40}}>
                    <i className="fas fa-plus" style={{zIndex: 1}}></i>
                    <input
                        type="file"
                        accept="image/jpg, image/png"
                        name="newPhoto"
                        style={{outline: 'none', width: '100%', height: '100%', zIndex: 2, cursor: 'pointer', opacity: 0}}
                        onChange={(e) => this.addPhoto(e)}
                    />
                </div>
            </div>
        );
    }

    addPhoto(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.props.Photo.newPhoto = e.target.result;
            this.props.Photo.addPhoto();
        }
    }

    delPhoto(element) {
        this.props.Photo[element] = '';
        if (this.props.Photo.one === '') {
            this.props.Photo.one = this.props.Photo.two;
            this.props.Photo.two = this.props.Photo.three;
            this.props.Photo.three = this.props.Photo.four;
            this.props.Photo.four = this.props.Photo.five;
        }
        else if (this.props.Photo.two === '') {
            this.props.Photo.two = this.props.Photo.three;
            this.props.Photo.three = this.props.Photo.four;
            this.props.Photo.four = this.props.Photo.five;
        }
        else if (this.props.Photo.three === '') {
            this.props.Photo.three = this.props.Photo.four;
            this.props.Photo.four = this.props.Photo.five;
        }
        else if (this.props.Photo.four === '') {
            this.props.Photo.four = this.props.Photo.five;
        }
        let params = `userId=${localStorage.getItem('userId')}&1=${this.props.Photo.one}&2=${this.props.Photo.two
        }&3=${this.props.Photo.three}&4=${this.props.Photo.four}&5=${this.props.Photo.five}`;
        fetchPost('editPhotos', params);
    }

    render() {
        const {
            one,
            two,
            three,
            four,
            five,
        } = this.props.Photo;

        return (
            <div id="profile_photos">
                <div style={{marginBottom: 10, alignItems: 'flex-end'}}>
                    {one ? this.isPhoto(one, 'one') : this.noPhoto('one')}
                    {two ? this.isPhoto(two, 'two') : this.noPhoto('two')}
                </div>
                <div>
                    {three ? this.isPhoto(three, 'three') : this.noPhoto('three')}
                    {four ? this.isPhoto(four, 'four') : this.noPhoto('four')}
                    {five ? this.isPhoto(five, 'five') : this.noPhoto('five')}
                </div>
            </div>
        );
    }
}