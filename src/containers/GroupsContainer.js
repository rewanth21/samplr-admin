import React, { Component } from 'react'
import GroupList from '../components/GroupList';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Panel } from 'react-bootstrap';

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
                <Panel>
                    <h1>Survey Groups</h1>
                    <p>
                        Select a group to view its surveys. Click <i>Create Survey</i> on the right of any group to make new surveys for that group.
                    </p>
                    <GroupList user={user} groups={groups} {...bindActionCreators(actionCreators, dispatch)} />
                </Panel>
            </div>
        )
    }
}

export default connect(select)(GroupsContainer);
