import React, { Component } from 'react';
// import {PropTypes} from 'prop-types';
// const google = window.google;

const userInfo = {
        firstName: 'alexandra',
        lastName: 'naumenko',
        login: 'anaumenk',
        email: 'al13ra@gmail.com',
        orientation: 'straight',
        gender: 'woman',
        occupation: 'unit, it, something else',
        biography: 'bla-bla-bla',
        birthDay: 13,
        birthMonth: 'May',
        birthYear: '1994',
        latitude: '-34.397',
        longitude: '150.644',
        tags: JSON.parse(localStorage.getItem('tags')) ? JSON.parse(localStorage.getItem('tags')) : [],
        newTag: '',
        map: '',
    }
;

export default class Setting extends Component {
    // static contextTypes = {
    //     isAuthenticated: PropTypes.bool,
    // }

    constructor() {
        super();
        this.state = userInfo;
        this.handleChange = this.handleChange.bind(this);
    }

    birthYear() {
        let select = [];
        let year = 1918;
        for (let i = 0; i < 84; i++) {
            select.push(<option value={year} key={i}>{year++}</option>);
        }
        return (select);
    }

    birthDay() {
        let select = [];
        for (let i = 1; i < 32; i++) {
            select.push(<option value={i} key={i}>{i}</option>);
        }
        return (select);
    }

    handleChange(e) {
        this.setState({newTag: e.target.value}); //переписать в бд e.target.name + e.target.value
    };

    tagList() {
        let array = [];
        this.state.tags.map(tag =>
            array.push(
                <div
                    className={"new_tag"}
                    key={tag.id}
                    style={{cursor: 'text'}}
                    onClick={() => this.remove(tag.id)}
                >
                    {tag.text}
                </div>));
        return array;
    }

    remove(id) {
        let array = [];

        for (let tag of this.state.tags) {
            if (id !== tag.id) {
                array = [...array, tag];
            }
        }
        this.setState({tags: array});
    }

    handleKeyPress(e) {
        if (e.key === "Enter" && this.state.newTag !== '') {
            let i;
            for (let tag of this.state.tags) {
                i = tag.id;
            }
            i = i ? i : 0;
            this.setState({
                tags: [...this.state.tags, {id: ++i, text: `#${this.state.newTag}`}],
                newTag: ''
            });
        }
    }

    saveToLocalStorage() {
        const tags = JSON.stringify(this.state.tags);

        localStorage.setItem('tags', tags);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tags !== this.state.tags) {
            this.saveToLocalStorage();
        }
    }
    // componentDidMount() {
    //     let center = {lat: Number(this.state.latitude), lng: Number(this.state.longitude)};
    //     let map = new google.maps.Map(
    //         document.getElementById('map'), {zoom: 8, center: center});
    //     new google.maps.Marker({position: center, map: map});
    // }

    render() {
        // console.log(this.context);

        const {
            firstName,
            lastName,
            login,
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
        } = this.state;

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
                    <p>Login</p>
                    <input type="text" value={login} name="login" onChange={(e) => this.handleChange(e)} />
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
                    <input type="text" value={occupation} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div className="edit_field">
                    <p>Biography</p>
                    <input id="bio" type="text" value={biography} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div className="edit_field">
                    <div id="birth_data">
                        <div id="birth_day">
                            <p>Day</p>
                            <select defaultValue={birthDay} onChange={(e) => this.handleChange(e)}>
                                {this.birthDay()}
                            </select>
                        </div>
                        <div id="birth_month">
                            <p>Month</p>
                            <select id="birth_month" value={birthMonth} onChange={(e) => this.handleChange(e)}>
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
                            <select value={birthYear} onChange={(e) => this.handleChange(e)}>
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
                           onKeyPress={(e) => this.handleKeyPress(e)}
                    />
                </div>
                <div id="location">
                    <p>Location</p>
                    <div id="map"></div>
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlgtB5jjzXNhwEUU3RLUmj62ZGD1wzUKg"
                            async defer></script>
                </div>
            </div>

        );
    }
}