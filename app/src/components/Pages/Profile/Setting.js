import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
// const google = window.google;

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
@inject('Profile')
@observer
class Setting extends Component {
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
        // let emailValid = this.state.emailValid;

        switch(e.target.name) {
            case 'email':
                console.log(e.target.value);
                if (!e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    this.props.Profile.style = '1px solid red';
                }
                else {
                    this.props.Profile.style = 'none';
                }
                break;
            default:
                break;
        }
        this.props.User[e.target.name] = e.target.value;
    };

    tagList() {
        let array = [],
            i = 1;
        if (this.props.User.tags) {
            let tags = this.props.User.tags.split(',');
            for (let tag of tags) {
                array.push(
                    <div
                        className={"new_tag"}
                        key={i++}
                        style={{cursor: 'pointer'}}
                        onClick={(e) => {
                            let text = e.target.innerHTML;
                            // e.target.remove();
                            this.props.User.removeTag(text);
                        }}
                    >
                        {`${tag}`}
                    </div>
                )
            }
        }
        return array;
    }

    handleKeyPress(e) {
        if (e.key === "Enter" && this.props.User.newTag !== '') {
            this.props.User.addNewTag();
        }
    }

    Position(marker, map) {
        console.log(marker);
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
        } = this.props.User;

        return (
            <div style={{maxWidth: 300}}>
                <div className="edit_field">
                    <p>First name</p>
                    <input type="text" value={firstName} name="firstName" onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="edit_field">
                    <p>Last name</p>
                    <input type="text" value={lastName}  name="lastName" onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="edit_field">
                    <p>Email adress</p>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                        style={{border: this.props.Profile.style}}
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
                    <input type="text" value={occupation} name='occupation' onChange={(e) => this.handleChange(e)}/>
                </div>
                <div className="edit_field">
                    <p>Biography</p>
                    <input id="bio" type="text" value={biography} name='biography' onChange={(e) => this.handleChange(e)}/>
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
                        {this.tagList()}
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
                    <div id="map">
                        <Map
                            google={this.props.google}
                            zoom={14}
                            initialCenter= {{
                                 lat: latitude,
                                 lng: longitude
                            }}
                        >
                            <Marker
                                draggable={true}
                                onDragend={this.Position}
                                // position={{
                                //      lat: latitude,
                                //      lng: longitude
                                // }}
                            />
                        </Map>
                    </div>
                </div>
                <button
                    className="button"
                    style={{width: 300, marginTop: 10}}
                    onClick={() => {
                        if (this.props.Profile.style === 'none') {

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