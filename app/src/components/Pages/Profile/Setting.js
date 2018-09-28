import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {fetchPost} from "../../../fetch";
// import UserProfile from './UserProfile';
// const google = window.google;

@inject('User')
@inject('Profile')
@observer
export default class Setting extends Component {
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

    handleChange = (e) => {
        // let emailValid = this.state.emailValid;
        // switch(e.target.name) {
        //     case 'email':
        //         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        //         fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        //         break;
        //     default:
        //         break;
        // }
        this.props.User[e.target.name] = e.target.value;
    };

    tagList() {
        let array = [];
        let tags = this.props.User.tags.split(',');
        let i = 0;
        for (let tag of tags) {
            array.push(
                <div
                    className={"new_tag"}
                    style={{cursor: 'pointer'}}
                    onClick={(e) => e.target.remove()}
                    key={i++}
                >
                    #{tag}
                </div>
            )
        }
        return array;
    }

    // remove(id) {
    //     let array = [];
    //     let tags = this.props.User.tags.split(', ');
    //     let i = 0;
    //
    //     for (let tag of tags) {
    //         if (id !== i++) {
    //             array = [...array, tag];
    //         }
    //     }
    //     this.props.User.tags = array;
    // }

    handleKeyPress(e) {
        if (e.key === "Enter" && this.props.User.newTag !== '') {
            this.props.User.tags += `,${this.props.User.newTag}`;
            this.props.User.newTag = '';
        }
    }

    saveChanges() {
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
            // latitude,
            // longitude,
            // tags,
            // map,
        } = this.props.User;

        let params = `userId=${localStorage.getItem('userId')}&firstName=${firstName}&lastName=${lastName}
        &email=${email}&orientation=${orientation}&gender=${gender}
        &occupation=${occupation}&biography=${biography}
        &birthDay=${birthDay}&birthMonth=${birthMonth}
        &birthYear=${birthYear}`;
        fetchPost('editInfo', params);
        // this.props.Profile.contentChange(<UserProfile />);
    }

    // componentDidMount() {
    //     let center = {lat: Number(this.state.latitude), lng: Number(this.state.longitude)};
    //     let map = new google.maps.Map(
    //         document.getElementById('map'), {zoom: 8, center: center});
    //     new google.maps.Marker({position: center, map: map});
    // }

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
            // latitude,
            // longitude,
            // tags,
            newTag,
            // map,
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
                    <input type="email" value={email} name="email" onChange={(e) => this.handleChange(e)}/>
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
                            <select defaultValue={birthDay} name='birthDay' onChange={(e) => this.handleChange(e)}>
                                {this.birthDay()}
                            </select>
                        </div>
                        <div id="birth_month">
                            <p>Month</p>
                            <select id="birth_month" value={birthMonth} name='birthMonth' onChange={(e) => this.handleChange(e)}>
                                <option value="Jan">Jan</option>
                                <option value="Feb">Feb</option>
                                <option value="Mar">Mar</option>
                                <option value="Apr">Apr</option>
                                <option value="May">May</option>
                                <option value="Jun">Jun</option>

                                <option value="Jul">Jul</option>
                                <option value="Aug">Aug</option>
                                <option value="Sep">Sep</option>
                                <option value="Oct">Oct</option>
                                <option value="Nov">Nov</option>
                                <option value="Dec">Dec</option>
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
                    <div id="map"></div>
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlgtB5jjzXNhwEUU3RLUmj62ZGD1wzUKg"
                            async defer></script>
                </div>
                <button
                    className="button"
                    style={{width: 300,}}
                    onClick={() => this.saveChanges()}
                >Save</button>
            </div>

        );
    }
}