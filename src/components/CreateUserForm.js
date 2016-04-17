import React, { Component, PropTypes } from 'react';
import * as ENUMS from '../constants/Enums';
import { Input, Button, Alert } from 'react-bootstrap';
import _ from 'lodash';

import {reduxForm} from 'redux-form';

const formFields = [
    'email',
    'firstName',
    'lastName',
    'password',
    'age',
    'isResearcher'
]

class CreateGroupForm extends Component {

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

        createUser(this.props.fields.isResearcher.value, {
            email: this.props.fields.email.value,
            firstName: this.props.fields.firstName.value,
            lastName: this.props.fields.lastName.value,
            password: this.props.fields.password.value,
            age: this.props.fields.age.value,
        }, () => {
            this.props.resetForm();
        });

    }

    render() {
        const {
            createUserForm: {
                isLoading,
                error
            },
            fields: {
                email,
                firstName,
                lastName,
                age,
                password,
                isResearcher
            }
        } = this.props;

        let errorMessage = null;
        if (error) {
            errorMessage = (
                <Alert bsStyle="danger">
                    <h4>{error.title}</h4>
                    <p>{error.error}</p>
                </Alert>
            );
        }

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input type='email'
                    id='email'
                    ref="email"
                    defaultValue={email}
                    label="Email"
                    placeholder="Email address this user will use to login"
                    {...email}/>

                <Input type='text'
                    id='firstName'
                    ref="firstName"
                    label="First Name"
                    placeholder="The user's first name"
                    {...firstName}/>

                <Input type='text'
                    id='lastName'
                    ref="lastName"
                    label="Last Name"
                    placeholder="The user's last name"
                    {...lastName}/>

                <Input type='number'
                    id='age'
                    ref="age"
                    label="Age"
                    placeholder="The user's age"
                    {...age}/>

                <Input type='password'
                    id='password'
                    ref="password"
                    label="password"
                    placeholder="Password for the user"
                    {...password}/>

                <Input type='checkbox'
                    id='isResearcher'
                    ref="isResearcher"
                    label="Is this user a Researcher?"
                    help={<span>If checked, this user will be able to access this admin panel</span>}
                    placeholder="Password for the user"
                    {...isResearcher}/>

                {errorMessage}

                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Continue</span> }
                </Button>
            </form>
        );
    }

}
export default reduxForm({
    form: 'simple',
    fields: formFields
})(CreateGroupForm);
