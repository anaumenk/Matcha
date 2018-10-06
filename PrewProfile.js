import React, { Component } from 'react';

export default class PrewProfile extends Component {
    state = {
        currPhoto: this.props[1]['one'],
    };

    tagList() {
        let array = [];
        let i = 0;
        if (this.props[0]['tags']) {
            let tags = this.props[0]['tags'].split(',');
            for (let tag of tags) {
                array.push(
                    <div
                        className={"new_tag"}
                        key={i++}
                    >
                        {`#${tag}`}
                    </div>
                )
            }
        }
        return array;
    }


    PhotoRight() {
        let newPhoto;
        if (this.state.currPhoto === this.props[1]['one']) {
            if (this.props[1]['two']) {
                newPhoto = this.props[1]['two'];
            }
        }
        else if (this.state.currPhoto === this.props[1]['two']) {
            if (this.props[1]['three']) {
                newPhoto = this.props[1]['three'];
            }
        }
        else if (this.state.currPhoto === this.props[1]['three']) {
            if (this.props[1]['four']) {
                newPhoto = this.props[1]['four'];
            }
        }
        else if (this.state.currPhoto === this.props[1]['four']) {
            if (this.props[1]['five']) {
                newPhoto = this.props[1]['five'];
            }
        }
        this.setState({
            currPhoto: newPhoto,
        });
    }

    PhotoLeft() {
        let newPhoto;
        if (this.state.currPhoto === this.props[1]['five']) {
            newPhoto = this.props[1]['four'];
        }
        else if (this.state.currPhoto === this.props[1]['four']) {
            newPhoto = this.props[1]['three'];
        }
        else if (this.state.currPhoto === this.props[1]['three']) {
            newPhoto = this.props[1]['two'];
        }
        else if (this.state.currPhoto === this.props[1]['two']) {
            newPhoto = this.props[1]['one'];
        }
        this.setState({
            currPhoto: newPhoto,
        });
    }

    age() {
        let date = this.props[0]['birth'];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    render() {
        return (
            <div id="user_profile">
                {this.props[1]['one'] &&
                <div className="user_profile_photo">
                    <img src={require(`../../../${this.state.currPhoto}`)} alt={this.props[0]['login']}/>
                    <i className="fas fa-arrow-right" onClick={() => this.PhotoRight()}></i>
                    <i className="fas fa-arrow-left" onClick={() => this.PhotoLeft()}></i>
                </div>
                }
                <div id="user_profile_info">
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>{this.props[0]['firstName']} {this.props[0]['lastName']}, {this.age()}</p>
                    <p>{this.props[0]['orientation']}, {this.props[0]['gender']}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Occupation:</span> {this.props[0]['occupation']}</p>
                    <p style={{margin: '10px 0'}}><span style={{fontWeight: 'bold'}}>Biography:</span> {this.props[0]['biography']}</p>
                    <div className="tags" style={{width: 350, marginTop: 10}}>
                        <p className="name">Tags</p>
                        <div className="tag_list">
                            {this.tagList()}
                        </div>
                    </div>
                    <p style={{fontWeight: 'bold', margin: '10px 0'}}>Rating <span style={{color: '#179b77'}}>{this.props[0]['rating']}</span></p>
                </div>

            </div>
        );
    }
}