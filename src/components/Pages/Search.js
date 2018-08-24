import React, { Component } from 'react';

export class Rating extends Component {
    constructor() {
        super();
        this.state = {
            start: 0,
            end: 100,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        let parent = document.querySelector(".rating"),
            rangeS = parent.querySelectorAll("input[type=range]"),
            number1 = document.querySelector(".left_rating"),
            number2 = document.querySelector(".right_rating");

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
        this.setState({start: number1.innerHTML, end: number2.innerHTML});
    }

    render() {
        const {
            start,
            end,
        } = this.state;

        return (
            <div className="sort_line">
                <div className="text">
                    <p className="name">Rating</p>
                    <div className="interval">
                        <p className="left_rating">{start}</p>
                        <p>-</p>
                        <p className="right_rating">{end}</p>
                    </div>
                </div>
                <div className="line rating">
                    <input value={start} min="0" max="100" step="1" type="range" onChange={this.handleChange}/>
                    <input value={end} min="0" max="100" step="1" type="range" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export class Distance extends Component {
    constructor() {
        super();
        this.state = {
            start: 0,
            end: 100,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        let parent = document.querySelector(".distance"),
            rangeS = parent.querySelectorAll("input[type=range]"),
            number1 = document.querySelector(".left_distance"),
            number2 = document.querySelector(".right_distance");

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
        this.setState({start: number1.innerHTML, end: number2.innerHTML});
    }

    render() {
        const {
            start,
            end,
        } = this.state;

        return (
            <div className="sort_line">
                <div className="text">
                    <p className="name">Distance</p>
                    <div className="interval">
                        <p className="left_distance">{start}</p>
                        <p>-</p>
                        <p className="right_distance">{end}</p>
                    </div>
                </div>
                <div className="line distance">
                    <input value={start} min="0" max="100" step="1" type="range" onChange={this.handleChange}/>
                    <input value={end} min="0" max="100" step="1" type="range" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export class Age extends Component {
    constructor() {
        super();
        this.state = {
            start: 18,
            end: 30,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        let parent = document.querySelector(".age"),
            rangeS = parent.querySelectorAll("input[type=range]"),
            number1 = document.querySelector(".left_age"),
            number2 = document.querySelector(".right_age");

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
        this.setState({start: number1.innerHTML, end: number2.innerHTML});
    }

    render() {
        const {
            start,
            end,
        } = this.state;

        return (
            <div className="sort_line">
                <div className="text">
                    <p className="name">Age</p>
                    <div className="interval">
                        <p className="left_age">{start}</p>
                        <p>-</p>
                        <p className="right_age">{end}</p>
                    </div>
                </div>
                <div className="line age">
                    <input value={start} min="18" max="100" step="1" type="range" onChange={this.handleChange}/>
                    <input value={end} min="18" max="100" step="1" type="range" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        this.setState({userInput: e.target.value});
    }

    handleKeyPress(e) {
        if (e.key === "Enter" && this.state.userInput !== '') {
            let parent = document.getElementsByClassName('tag_list'),
                newelement = document.createElement('div');
            newelement.innerHTML = `#${this.state.userInput}`;
            newelement.className = 'new_tag';
            newelement.onclick = function () {
                this.remove();
            };
            parent[0].appendChild(newelement);

            this.setState({userInput: ''});
        }
    }

    render() {
        const {userInput} = this.state;

        return (
            <main>
                <div className="nav_panel">
                    <div className="filters">
                        <div id="sort_by">
                            <p className="name">Sort by</p>
                            <select>
                                <option>Age</option>
                                <option>Distance</option>
                                <option>Rating</option>
                            </select>
                        </div>
                        <Age />
                        <Distance />
                        <Rating />
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

                    </div>
                </div>
                <div className="content">
                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name"/>
                        </div>
                        <div className="user_profile_result_info">
                            <p>Name</p>
                            <p>Age</p>
                        </div>
                    </div>

                </div>
            </main>
        );
    }
}