import React, { Component, PropTypes } from 'react'
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import UsersList from '../components/UsersList'
import { Panel } from 'react-bootstrap';

class UsersContainer extends Component {
    render() {
        const { dispatch, users, user } = this.props
        console.log(users);
        return (
            <div className="container">
                <Panel>
                    <h1>Users</h1>
                    <p>
                        This is a list of all users you have associated with your account.
                    </p>
                    <UsersList
                        users={users}
                        user={user}
                        {...bindActionCreators(actionCreators, dispatch)} />
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

export default connect(select)(UsersContainer)
