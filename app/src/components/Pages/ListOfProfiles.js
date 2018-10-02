import React, { Component } from 'react';
import {Slider, Tags, People} from './Search';
import {inject, observer} from 'mobx-react';

@inject('Research')
@observer
export default class Research extends Component {
    handleChange = (e) => {
        this.props.Research[e.target.name] = e.target.value;
    };

    render() {
        const {
            sortBy,
            listOfPeople
        } = this.props.Research;

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
                            onClick={() => this.props.Research.search()}
                        >Search</button>
                    </div>
                </div>
                {
                    listOfPeople && <People listOfPeople={listOfPeople}/>
                }
            </main>
        );
    }
}