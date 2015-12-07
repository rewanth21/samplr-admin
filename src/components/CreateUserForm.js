import React, { Component, PropTypes } from 'react';
import * as ENUMS from '../constants/Enums';
import { Input, Button } from 'react-bootstrap';
import _ from 'lodash';

export default class CreateGroupForm extends Component {

    // horrible Babel bug:
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        createUserForm: PropTypes.object.isRequired
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const { createUser } = this.props;

        createUser({
            email: this.refs.email.getValue(),
            firstName: this.refs.firstName.getValue(),
            lastName: this.refs.lastName.getValue(),
            password: this.refs.password.getValue(),
            age: this.refs.age.getValue(),
        });
    }

    render() {
        const { createUserForm: { email, firstName, lastName, age, isLoading } } = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input type='email'
                    id='email'
                    ref="email"
                    defaultValue={email}
                    label="Email"
                    placeholder="Email address this user will use to login"/>

                <Input type='text'
                    id='firstName'
                    ref="firstName"
                    defaultValue={firstName}
                    label="First Name"
                    placeholder="The user's first name"/>

                <Input type='text'
                    id='lastName'
                    ref="lastName"
                    defaultValue={lastName}
                    label="Last Name"
                    placeholder="The user's last name"/>

                <Input type='number'
                    id='age'
                    ref="age"
                    defaultValue={age}
                    label="Age"
                    placeholder="The user's age"/>

                <Input type='password'
                    id='password'
                    ref="password"
                    defaultValue={password}
                    label="password"
                    placeholder="Password for the user"/>


                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Continue</span> }
                </Button>
            </form>
        );
    }

}
