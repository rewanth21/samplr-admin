import React, { Component } from 'react'
import CreateUserForm from '../components/CreateUserForm';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function select(state) {
    return {
        createUserForm: state.createUserForm,
    };
}

class CreateUserContainer extends Component {
    render() {
        const { createUserForm, dispatch } = this.props;

        return (
            <div className="container">
                <Panel>
                    <Breadcrumb>
                        <LinkContainer to="/users">
                            <BreadcrumbItem>
                                Users
                            </BreadcrumbItem>
                        </LinkContainer>
                        <BreadcrumbItem active>
                            New User
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1>Create a new user</h1>
                    <CreateUserForm createUserForm={createUserForm}
                        {...bindActionCreators(actionCreators, dispatch)} />
                </Panel>
            </div>
        )
    }
}

export default connect(select)(CreateUserContainer);
