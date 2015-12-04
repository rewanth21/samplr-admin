import React, { Component, PropTypes } from 'react';

import { Input, Button, Panel } from 'react-bootstrap';

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
            <div style={{
                    margin: '100px auto',
                    width: 500
                }}>
                <h1>Please Log In</h1>
                <Panel>
                    <form onSubmit={this.handleFormSubmit}>
                        <Input type='text'
                            id='email'
                            defaultValue={username}
                            label="Email"
                            placeholder="Enter an email"/>

                        <Input type='password'
                            id='password'
                            label="Password"
                            placeholder="Enter your password" />

                        <Button type="submit"
                            bsStyle="primary"
                            disabled={isLoading}>
                            { isLoading ? <span>Loading...</span> : <span>Log In</span> }
                        </Button>
                    </form>
                </Panel>
            </div>
        );
    }

}
