import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

function getAge(data) {
    let array = data.split('-'),
        year = array[0],
        month = array[1] | 0,
        day = array[2] | 0,
        date = year-month-day;
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
}

export const People = props => (
    <div className="content">
        {props.listOfPeople.map(people => {
            return(
                <div key={people.userId} className="user_profile_result">
                    <div className="user_profile_result_img">
                        <img src={require(`../../${people.photo}`)} alt={people.firstName}/>
                    </div>
                    <div className="user_profile_result_info">
                    <p>{`${people.lastName} ${people.firstName}`}</p>
                    <p>{getAge(people.birth)}</p>
                    </div>
                </div>
            )
        })}
    </div>
);

@inject('Research')
@observer
export class Tags extends Component {

    handleUserInput = (e) => {
        this.props.Research.userInput = e.target.value;
    };

    handleKeyPress(e) {
        if (e.key === "Enter" && this.props.Research.userInput !== '') {
            let parent = document.getElementsByClassName('tag_list'),
                newelement = document.createElement('div');
            newelement.innerHTML = `#${this.props.Research.userInput}`;
            newelement.className = 'new_tag';
            newelement.style.cursor = 'pointer';
            newelement.onclick = (e) => {
                this.props.Research.removeTag(e.target.innerHTML);
                e.target.remove();
            };
            parent[0].appendChild(newelement);
            this.props.Research.tags.push(this.props.Research.userInput);
            this.props.Research.userInput = '';
        }
    }
    render() {
        const {userInput} = this.props.Research;

        return (
            <div className="tags">
                <p className="name">Tags</p>
                <div className="tag_list">
                </div>
                <input type="text"
                       onChange={this.handleUserInput}
                       value={userInput}
                       onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
        );
    }
}

@inject('Research')
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
        this.props.Research[`${this.props.name}Start`] = number1.innerHTML;
        this.props.Research[`${this.props.name}End`] = number2.innerHTML;
    };

    render() {
        const {name} = this.props;
        return (
            <div className="sort_line">
                <div className="text">
                    <p className="name">{name}</p>
                    <div className="interval">
                        <p className={`left_${name}`}>{this.props.Research[`${name}Start`]}</p>
                        <p>-</p>
                        <p className={`right_${name}`}>{this.props.Research[`${name}End`]}</p>
                    </div>
                </div>
                <div className={`line ${name}`}>
                    <input
                        value={this.props.Research[`${name}Start`]}
                        min={this.props.Research[`min${name}`]}
                        max={this.props.Research[`max${name}`]}
                        step="1"
                        type="range"
                        onChange={this.handleChange}
                    />
                    <input
                        value={this.props.Research[`${name}End`]}
                        min={this.props.Research[`min${name}`]}
                        max={this.props.Research[`max${name}`]}
                        step="1"
                        type="range"
                        onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

@inject('Research')
@observer
export default class Search extends Component {
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