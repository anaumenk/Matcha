import React, { Component } from 'react';
import {Rating, Distance, Age} from './Search';

export default class Research extends Component {
    state = {
        userInput: '',
    };

    handleUserInput = (e) => {
        this.setState({userInput: e.target.value});
    };

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
        const {
            userInput,
        } = this.state;

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

                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name" />
                        </div>
                        <div className="user_profile_result_info">
                            <p>Name</p>
                            <p>Age</p>
                        </div>
                    </div>

                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name" />
                        </div>
                        <div className="user_profile_result_info">
                            <p>Name</p>
                            <p>Age</p>
                        </div>
                    </div>

                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name" />
                        </div>
                        <div className="user_profile_result_info">
                            <p>Name</p>
                            <p>Age</p>
                        </div>
                    </div>

                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name" />
                        </div>
                        <div className="user_profile_result_info">
                            <p>Name</p>
                            <p>Age</p>
                        </div>
                    </div>

                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name" />
                        </div>
                        <div className="user_profile_result_info">
                            <p>Name</p>
                            <p>Age</p>
                        </div>
                    </div>

                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name" />
                        </div>
                        <div className="user_profile_result_info">
                            <p>Name</p>
                            <p>Age</p>
                        </div>
                    </div>


                    <div className="user_profile_result">
                        <div className="user_profile_result_img">
                            <img src={require('../../images/test.jpg')} alt="name" />
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