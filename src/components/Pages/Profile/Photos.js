import React, { Component } from 'react';

export default class Photos extends Component {
    render() {
        return (
            <div id="profile_photos">
                <div style={{marginBottom: 10, alignItems: 'flex-end'}}>
                    <div className="photo first">
                        <img src={require('../../../images/01.jpg')} alt="name" />
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="photo">
                        <img src={require('../../../images/test.jpg')} alt="name" />
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                <div>
                    <div className="photo">
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className="photo">
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className="photo">
                        <i className="fas fa-plus"></i>
                    </div>
                </div>
            </div>
        );
    }
}