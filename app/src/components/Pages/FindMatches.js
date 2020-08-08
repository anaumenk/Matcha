import React, { Component } from 'react';
import {Slider, Tags, People} from './Search';
import {inject, observer} from 'mobx-react';
import {Popup} from "./Profile/Setting";

@inject('Search')
@inject('Prew')
@inject('User')
@inject('Photo')
@observer
export default class FindMatches extends Component {
    handleChange = (e) => {
        this.props.Search[e.target.name] = e.target.value;
    };

    componentWillMount() {
        this.props.Search.clear();
        this.props.User.push();
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
            gender,
            orientation,
            latitude,
            longitude,
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
                        onClick={() => this.props.Search.findMatches(gender, orientation, latitude, longitude)}
                    >Search</button>
                </div>
                {listOfPeople && <People />}
                {this.props.Prew.profile}
                {this.props.Prew.popup && <Popup />}
            </main>
        );
    }
}
