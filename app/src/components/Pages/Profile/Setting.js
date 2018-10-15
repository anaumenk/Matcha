import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

@inject('Profile')
@observer
export class Popup extends Component {

    componentWillMount() {
        setTimeout(() => this.close(), 1000);
    }

    close() {
        this.props.Profile.popup = false;
    }

    render() {
        return (
            <div className="popup">
                <p>{this.props.Profile.popupText}</p>
            </div>
        );
    }
}

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
                        style={{cursor: 'pointer'}}
                        onClick={(e) => {
                            let text = e.target.innerHTML;
                            this.props.User.removeTag(text);
                            e.target.remove();
                        }}
                    >
                        {`#${tag.text}`}
                    </div>
                );
            })
        );
    }
}

@inject('User')
@inject('Profile')
@observer
class Setting extends Component {

    componentWillMount() {
        this.props.User.push();
    }

    birthYear = () => {
        let select = [];
        let year = 1918;
        for (let i = 0; i < 84; i++) {
            select.push(<option value={year} key={i}>{year++}</option>);
        }
        return (select);
    };

    birthDay = () => {
        let select = [];
        for (let i = 1; i < 32; i++) {
            select.push(<option value={i} key={i}>{i}</option>);
        }
        return (select);
    };

    birthMonth = () => {
        let select = [];
        for (let i = 1; i < 13; i++) {
            select.push(<option value={i} key={i}>{i}</option>);
        }
        return (select);
    };

    handleChange = (e) => {
        switch(e.target.name) {
            case 'firstName':
                this.props.Profile.firstNameStyle = !e.target.value.match(/^([a-zа-яё]+|\d+)$/i)
                    ? '1px solid red'
                    : 'none';
                break;
            case 'lastName':
                this.props.Profile.lastNameStyle = !e.target.value.match(/^([a-zа-яё]+|\d+)$/i)
                    ? '1px solid red'
                    : 'none';
                break;
            case 'occupation':
                this.props.Profile.occupationStyle = !e.target.value.match(/^([a-zа-яё]+|\d+)$/i)
                    ? '1px solid red'
                    : 'none';
                break;
            case 'biography':
                this.props.Profile.biographyStyle = !e.target.value.match(/^([a-zа-яё]+|\d+)$/i)
                    ? '1px solid red'
                    : 'none';
                break;
            case 'email':
                this.props.Profile.emailStyle = !e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                    ? '1px solid red'
                    : 'none';
                break;
            case 'newLocation':
                this.props.Profile.newLocationStyle = !e.target.value.match(/^([a-zа-яё]+|\d+)$/i)
                    ? '1px solid red'
                    : 'none';
                break;

            default:
                break;
        }
        this.props.User[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    };

    handleKeyPress(e) {
        if (e.key === "Enter") {
            switch(e.target.name) {
                case 'newTag':
                    if (this.props.User.newTag.match(/^([a-zа-яё]+|\d+)$/i)) {
                        this.props.User.addNewTag();
                        this.props.User.push();
                    }
                    else {
                        this.props.User.newTag = '';
                    }
                    break;
                case 'newLocation':
                    this.props.User.getNewLocation();
                    this.props.User.newLocation = '';
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            orientation,
            gender,
            occupation,
            biography,
            birthDay,
            birthMonth,
            birthYear,
            siteColor,
            latitude,
            longitude,
            newTag,
            locationChecked,
        } = this.props.User;

        return (
            <div style={{maxWidth: 300}}>
                <div className="edit_field">
                    <p>First name</p>
                    <input
                        type="text"
                        value={firstName}
                        name="firstName"
                        style={{border: this.props.Profile.firstNameStyle}}
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <div className="edit_field">
                    <p>Last name</p>
                    <input
                        type="text"
                        value={lastName}
                        name="lastName"
                        style={{border: this.props.Profile.lastNameStyle}}
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <div className="edit_field">
                    <p>Email adress</p>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                        style={{border: this.props.Profile.emailStyle}}
                    />
                </div>
                <div className="edit_field">
                    <p>Orientation</p>
                    <select name="orientation" onChange={(e) => this.handleChange(e)} value={orientation}>
                        <option>straight</option>
                        <option>gay</option>
                        <option>bisexual</option>
                    </select>
                </div>
                <div className="edit_field">
                    <p>Gender</p>
                    <select name="gender" value={gender} onChange={(e) => this.handleChange(e)}>
                        <option>woman</option>
                        <option>man</option>
                    </select>
                </div>
                <div className="edit_field">
                    <p>Occupation</p>
                    <input
                        type="text"
                        value={occupation}
                        name='occupation'
                        style={{border: this.props.Profile.occupationStyle}}
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <div className="edit_field">
                    <p>Biography</p>
                    <input
                        id="bio"
                        type="text"
                        value={biography}
                        name='biography'
                        style={{border: this.props.Profile.biographyStyle}}
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                <div className="edit_field">
                    <div id="birth_data">
                        <div id="birth_day">
                            <p>Day</p>
                            <select value={birthDay} name='birthDay' onChange={(e) => this.handleChange(e)}>
                                {this.birthDay()}
                            </select>
                        </div>
                        <div id="birth_month">
                            <p>Month</p>
                            <select id="birth_month" value={birthMonth} name='birthMonth' onChange={(e) => this.handleChange(e)}>
                                {this.birthMonth()}
                            </select>
                        </div>
                        <div id="birth_year">
                            <p>Year</p>
                            <select value={birthYear} name='birthYear' onChange={(e) => this.handleChange(e)}>
                                {this.birthYear()}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="edit_field">
                    <p>Site color</p>
                    <select value={siteColor} name='siteColor' onChange={(e) => this.handleChange(e)}>
                        <option>default</option>
                        <option>dark</option>
                    </select>
                </div>
                <div className="tags" style={{fontSize: 'large', marginTop: 5,}}>
                    <p className="name">Tags</p>
                    <div className="tag_list">
                        <Tags />
                    </div>
                    <input type="text"
                           onChange={this.handleChange}
                           value={newTag}
                           name='newTag'
                           onKeyPress={(e) => this.handleKeyPress(e)}
                    />
                </div>
                <div id="location">
                    <p>Location</p>
                    <div id="location_select">
                        <input
                            type="checkbox"
                            name="locationChecked"
                            checked={locationChecked}
                            onChange={this.handleChange}
                        />
                        <p>I don't want to be positionned</p>
                    </div>
                    {!locationChecked &&
                    <div id="map">
                        <div id="location_input">
                            <input
                                type="text"
                                placeholder="Enter your location"
                                name="newLocation"
                                style={{border: this.props.Profile.newLocationStyle}}
                                onChange={(e) => this.handleChange(e)}
                                onKeyPress={(e) => this.handleKeyPress(e)}
                            />
                        </div>
                        <Map
                            google={this.props.google}
                            zoom={14}
                            initialCenter= {{
                                lat: latitude,
                                lng: longitude
                            }}
                            center= {{
                                lat: latitude,
                                lng: longitude
                            }}
                        >
                            <Marker
                                position= {{
                                    lat: latitude,
                                    lng: longitude
                                }}
                            />
                        </Map>
                    </div>
                    }
                </div>
                <button
                    className="button"
                    style={{width: 300, marginTop: 10}}
                    onClick={() => {
                        if (this.props.Profile.firstNameStyle === 'none' &&
                            this.props.Profile.lastNameStyle === 'none' &&
                            this.props.Profile.emailStyle === 'none' &&
                            this.props.Profile.occupationStyle === 'none' &&
                            this.props.Profile.biographyStyle === 'none' &&
                            this.props.Profile.newLocationStyle === 'none') {
                                this.props.User.saveChanges();
                                this.props.Profile.popupText = 'Saved succesfully';
                                this.props.Profile.popup = true;
                        }
                    }}
                >Save</button>
            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAqLNucodvPuxX_30MWoh6g1YT6hWnvzS4")
})(Setting)