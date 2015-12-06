import React, { Component } from 'react'
import CreateGroupForm from '../components/CreateGroupForm';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'

function select(state) {
    return {
        createGroupForm: state.createGroupForm,
    };
}

class CreateGroupsContainer extends Component {
    render() {
        const { createGroupForm, dispatch } = this.props;

        return (
            <CreateGroupForm createGroupForm={createGroupForm} {...bindActionCreators(actionCreators, dispatch)} />
        )
    }
}

export default connect(select)(CreateGroupsContainer);
