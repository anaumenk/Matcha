import React, { Component } from 'react';
import {Slider, Tags, People} from './Search';
import {inject, observer} from 'mobx-react';

@inject('Search')
@observer
export default class FindMatches extends Component {
    // handleChange = (e) => {
    //     this.props.Search[e.target.name] = e.target.value;
    // };

    render() {
        // const {
        //     sortBy,
        //     listOfPeople
        // } = this.props.Search;

        return (
            <main>
                {/*<div className="nav_panel">*/}
                    {/*<div className="filters">*/}
                        {/*<div id="sort_by">*/}
                            {/*<p className="name">Sort by</p>*/}
                            {/*<select name="sortBy" value={sortBy} onChange={(e) => this.handleChange(e)}>*/}
                                {/*<option>Age</option>*/}
                                {/*<option>Distance</option>*/}
                                {/*<option>Rating</option>*/}
                            {/*</select>*/}
                        {/*</div>*/}
                        {/*<Slider name='Age' />*/}
                        {/*<Slider name='Distance' />*/}
                        {/*<Slider name='Rating' />*/}
                        {/*<Tags />*/}
                        {/*<button*/}
                            {/*className='button'*/}
                            {/*onClick={() => this.props.Search.search()}*/}
                        {/*>Search</button>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*{*/}
                    {/*listOfPeople && <People listOfPeople={listOfPeople}/>*/}
                {/*}*/}
            </main>
        );
    }
}