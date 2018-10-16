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
    }

    render() {
        const {
            sortBy,
            listOfPeople
        } = this.props.Search;

        const {
            gender,
            orientation,
            latitude,
            longitude,
        } = this.props.User;

        return (
            <main>
                <div className="nav_panel">
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
                        <Slider name='Rating' />
                        <Tags />
                        <button
                            className='button'
                            style={{marginTop:10}}
                            onClick={() => this.props.Search.findMatches(gender, orientation, latitude, longitude)}
                        >Search</button>
                    </div>
                </div>
                {listOfPeople && <People />}
                {this.props.Prew.profile}
                {this.props.Prew.popup && <Popup />}
            </main>
        );
    }
}