import React, { Component, PropTypes } from 'react';

export default class LoginFormComponent extends Component {

    // horrible Babel bug:
    constructor(props) {
        super(props);
    }

    static propTypes = {
        loginSubmitted: PropTypes.func.isRequired,
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const { loginSubmitted } = this.props;

        loginSubmitted({
            email: this.refs.email.value,
            password: this.refs.password.value,
        })
    }

    render() {
        const { loginForm: { username, isLoading } } = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' defaultValue={username} ref='email' />

                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref='password' />

                <input type='submit' style={{textAlign: 'right',}} disabled={isLoading} />

                { isLoading ? <span>Loading...</span> : null }
            </form>
        );
    }

}
