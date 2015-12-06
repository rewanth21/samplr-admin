import React, { Component } from 'react'
import GroupList from '../components/GroupList';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function select(state) {
    return {
        user: state.user,
        groups: state.groups
    };
}

class GroupsContainer extends Component {
    render() {
        const { dispatch, user, groups } = this.props;

        return (
            <div className="container">
                <GroupList user={user} groups={groups} {...bindActionCreators(actionCreators, dispatch)} />
            </div>
        )
    }
}

export default connect(select)(GroupsContainer);
