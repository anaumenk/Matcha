import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Popup} from "./Profile/Setting";
import {socket} from "../../App";

@inject('Search')
@inject('Prew')
@inject('User')
@observer
export class People extends Component {
    render() {
        return (
            <div className="content" style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {this.props.Search.listOfPeople.map(people => {
                    return (
                       <div key={people.userId} className="user_profile_result">
                            <div
                                className="user_profile_result_img"
                                onClick={() => {
                                    this.props.Prew.profile = '';
                                    this.props.Prew.openUserProfile(this.props.User.userId, people.userId);
                                    this.props.Prew.getViewed(people.userId);
                                    socket.emit('notification', people.userId);
                                }}
                            >
                                {(people.photo && people.photo.match(/http/)) && <img src={people.photo} alt={people.firstName}/>}
                                {(people.photo && !people.photo.match(/http/)) && <img src={require(`../../${people.photo}`)} alt={people.firstName}/>}
                            </div>
                       </div>
                    )
                })}
            </div>
        );
    }
}

@inject('Search')
@observer
export class Tags extends Component {

    handleUserInput = (e) => {
        this.props.Search.newTag = e.target.value;
    };

    handleKeyPress(e) {
        if (e.key === "Enter" && this.props.Search.newTag.match(/^([a-zа-яё]+|\d+)$/i)) {
            if (this.props.Search.ifTag()) {
                let parent = document.getElementsByClassName('tag_list'),
                    newelement = document.createElement('div');
                newelement.innerHTML = `#${this.props.Search.newTag}`;
                newelement.className = 'new_tag';
                newelement.style.cursor = 'pointer';
                newelement.onclick = (e) => {
                    let text = e.target.innerHTML;
                    e.target.remove();
                    this.props.Search.removeTag(text);
                };
                parent[0].appendChild(newelement);
                this.props.Search.tags.push(this.props.Search.newTag);
                this.props.Search.newTag = '';
            }
        }
        else if (e.key === "Enter") {
            this.props.Search.newTag = '';
        }
    }

    render() {
        return (
            <div className="tags">
                <p className="name">Tags</p>
                <div className="tag_list">
                </div>
                <input type="text"
                       onChange={(e) => this.handleUserInput(e)}
                       value={this.props.Search.newTag}
                       onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
        );
    }
}

@inject('Search')
@inject('Profile')
@observer
export class Slider extends Component {
    handleChange = () => {
        let parent = document.querySelector(`.${this.props.name}`),
            rangeS = parent.querySelectorAll("input[type=range]"),
            number1 = document.querySelector(`.left_${this.props.name}`),
            number2 = document.querySelector(`.right_${this.props.name}`);

        rangeS.forEach(function(el) {
            el.oninput = function() {
                let slide1 = parseFloat(rangeS[0].value),
                    slide2 = parseFloat(rangeS[1].value);

                if (slide1 > slide2) {
                    [slide1, slide2] = [slide2, slide1];
                }
                number1.innerHTML = slide1;
                number2.innerHTML = slide2;
            };
        });
        this.props.Search[`${this.props.name}Start`] = number1.innerHTML;
        this.props.Search[`${this.props.name}End`] = number2.innerHTML;
    };

    render() {
        let {name} = this.props;
        return (
            <div className="sort_line">
                <div className="text">
                    <p className="name">{name}</p>
                    <div className="interval">
                        <p className={`left_${name}`}>{this.props.Search[`${name}Start`]}</p>
                        <p>-</p>
                        <p className={`right_${name}`}>{this.props.Search[`${name}End`]}</p>
                    </div>
                </div>
                <div className={`line ${name}`}>
                    <input
                        value={this.props.Search[`${name}Start`]}
                        min={this.props.Search[`min${name}`]}
                        max={this.props.Search[`max${name}`]}
                        step="1"
                        type="range"
                        onChange={this.handleChange}
                    />
                    <input
                        value={this.props.Search[`${name}End`]}
                        min={this.props.Search[`min${name}`]}
                        max={this.props.Search[`max${name}`]}
                        step="1"
                        type="range"
                        onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

@inject('Search')
@inject('Profile')
@inject('Prew')
@inject('Photo')
@inject('User')
@observer
export default class Search extends Component {
    handleChange = (e) => {
        this.props.Search[e.target.name] = e.target.value;
    };

    componentWillMount() {
        this.props.User.push();
        this.props.Search.clear();
        this.props.Photo.push();
        this.props.Prew.clean();
    }

    handleSliderChange = () => {
        let parent = document.querySelector(`.Rating`),
            rangeS = parent.querySelectorAll("input[type=range]"),
            number = document.querySelector(`.left_Rating`);
        number.innerHTML = parseFloat(rangeS[0].value);
        this.props.Search[`RatingStart`] = number.innerHTML;
    };

    render() {
        let {
            sortBy,
            listOfPeople
        } = this.props.Search;

        let {
            latitude,
            longitude
        } = this.props.User;

        return (
            <main>
                <div className="filters">
                    <div id="sort_by">
                        <p className="name">Sort by</p>
                        <select name="sortBy" value={sortBy} onChange={(e) => this.handleChange(e)}>
                            <option>Age</option>
                            <option>Distance</option>
                            <option>Rating</option>
                        </select>
                    </div>
                    <Slider name='Age' />
                    <Slider name='Distance' />

                    <div className="sort_line">
                        <div className="text">
                            <p className="name">Rating</p>
                            <div className="interval">
                                <p className={`left_Rating`}>{this.props.Search.RatingStart}</p>
                                <p>-</p>
                                <p>...</p>
                            </div>
                        </div>
                        <div className={`line Rating`}>
                            <input
                                value={this.props.Search.RatingStart}
                                step="1"
                                min="-200"
                                max="500"
                                type="range"
                                onChange={this.handleSliderChange} />
                        </div>
                    </div>


                    <Tags />
                    <button
                        className='button'
                        style={{marginTop:10}}
                        onClick={() => this.props.Search.search(latitude, longitude)}
                    >Search</button>
                </div>
                {listOfPeople && <People />}
                {this.props.Prew.profile}
                {this.props.Profile.popup && <Popup />}
            </main>
        );
    }
}
