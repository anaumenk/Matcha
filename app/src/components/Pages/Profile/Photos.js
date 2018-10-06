import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {fetchPost} from "../../../fetch";

@inject('Photo')
@observer
export default class Photos extends Component {
    addPhoto(e) {
        e.preventDefault();
        let file = e.target.files[0],
           photoId;
        photoId = this.props.Photo.one === '' ? 1 : (this.props.Photo.two === '' ? 2 :
            (this.props.Photo.three === '' ? 3 : (this.props.Photo.four === '' ? 4 : 5)));
        if (file && file.type.match(/image.*/)) {
           let reader = new FileReader();
           reader.addEventListener('load', () => {
               this.props.Photo.newPhoto = reader.result;
               let params = `userId=${localStorage.getItem('userId')}&newPhoto=${this.props.Photo.newPhoto}&photoId=${photoId}`;
               fetchPost('addPhoto', params);
           });
           reader.readAsDataURL(file);
        }
        else {
           alert('not image you bastard');
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
        let params = `userId=${localStorage.getItem('userId')}&1=${this.props.Photo.one}&2=${this.props.Photo.two}
        &3=${this.props.Photo.three}&4=${this.props.Photo.four}&5=${this.props.Photo.five}`;
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

        const add = <div style={{width: 40, height: 40}}>
            <i className="fas fa-plus" style={{zIndex: 1}}></i>
            <input
                type="file"
                name="newPhoto"
                style={{outline: 'none', width: '100%', height: '100%', zIndex: 2, cursor: 'pointer', opacity: 0}}
                onChange={(e) => this.addPhoto(e)}
            />
        </div>;

        return (
            <div id="profile_photos">
                <div style={{marginBottom: 10, alignItems: 'flex-end'}}>
                    <div className="photo first">
                        {one && <img src={require(`../../../${one}`)} alt={one}/>}
                        {one ? <i
                            className="fas fa-times"
                            onClick={() => this.delPhoto('one')}
                        ></i> : add}
                    </div>
                    <div className="photo">
                        {two && <img src={require(`../../../${two}`)} alt={two}/>}
                        {two ? <i
                            className="fas fa-times"
                            onClick={() => this.delPhoto('two')}
                        ></i> : add}
                    </div>
                </div>
                <div>
                    <div className="photo">
                        {three && <img src={require(`../../../${three}`)} alt={three}/>}
                        {three ? <i
                            className="fas fa-times"
                            onClick={() => this.delPhoto('three')}
                        ></i> : add}
                    </div>
                    <div className="photo">
                        {four && <img src={require(`../../../${four}`)} alt={four}/>}
                        {four ? <i
                            className="fas fa-times"
                            onClick={() => this.delPhoto('four')}
                        ></i> : add}
                    </div>
                    <div className="photo">
                        {five && <img src={require(`../../../${five}`)} alt={five}/>}
                        {five ? <i
                            className="fas fa-times"
                            onClick={() => this.delPhoto('five')}
                        ></i> : add}
                    </div>
                </div>
            </div>
        );
    }
}