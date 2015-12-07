import React, { Component } from 'react';

export default class Dashboard extends Component {

    render() {
        const { user: { email } } = this.props;

        return (
            <div className="container">
                Super secret dashboard here for <b>{email}</b>
            </div>
        );
    }

}
