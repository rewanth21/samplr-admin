import React, { Component, PropTypes } from 'react'
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import UserList from '../components/UserList'
import { Panel } from 'react-bootstrap';

class Users extends Component {
    render() {
        const { dispatch, users, user } = this.props
        return (
            <div className="container">
                <Panel>
                    <h1>Users</h1>
                    <p>
                        This is a list of all users you have associated with your account.
                    </p>
                    <UserList users={users} user={user} {...bindActionCreators(actionCreators, dispatch)} />
                </Panel>
            </div>
        )
    }
}

function select(state) {
    return {
        user: state.user,
        users: state.users
    }
}

export default connect(select)(Users)
