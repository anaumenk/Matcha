import React, { Component } from 'react';

export default class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstName: 'Alexandra',
            lastName: 'Naumenko',
            orientation: 'straight',
            gender: 'woman',
            occupation: 'unit, it, something else',
            biography: 'bla-bla-bla',
            birthDay: '13',
            birthMonth: 'May',
            birthYear: '1994',
            tags: JSON.parse(localStorage.getItem('tags')) ? JSON.parse(localStorage.getItem('tags')) : [],
            rating: '100',
        };
    }

    getAge() {
        let year = this.state.birthYear,
            month = this.state.birthMonth,
            day = this.state.birthDay,
            date = `${year}-${month}-${day}`;
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    tagList() {
        let array = [];
        this.state.tags.map(tag =>
            array.push(
                <div
                    className={"new_tag"}
                    key={tag.id}
                >
                    {tag.text}
                </div>));
        return array;
    }

    render() {
        const {
            firstName,
            lastName,
            orientation,
            gender,
            occupation,
            biography,
            rating,
        } = this.state;

        return (
            <div id="user_profile">
                <div className="user_profile_photo">
                    <img src={require('../../../images/02.jpg')} alt="name" />
                    <i className="fas fa-arrow-right"></i>
                    <i className="fas fa-arrow-left"></i>
                </div>
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