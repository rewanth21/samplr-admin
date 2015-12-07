import React, { Component } from 'react'
import CreateGroupForm from '../components/CreateGroupForm';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function select(state) {
    return {
        createGroupForm: state.createGroupForm,
    };
}

class CreateGroupsContainer extends Component {
    render() {
        const { createGroupForm, dispatch } = this.props;

        return (
            <div className="container">
                <Panel>
                    <Breadcrumb>
                        <LinkContainer to="groups">
                            <BreadcrumbItem>
                                Groups
                            </BreadcrumbItem>
                        </LinkContainer>
                        <BreadcrumbItem active>
                            New Group
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1>Create a new user group</h1>
                    <CreateGroupForm createGroupForm={createGroupForm} {...bindActionCreators(actionCreators, dispatch)} />
                </Panel>
            </div>
        )
    }
}

export default connect(select)(CreateGroupsContainer);
