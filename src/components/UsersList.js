import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import UserTable from './UserTable';

class UsersList extends Component {

    componentWillMount () {
        this.props.getUsers(this.props.user.userId);
    }


    render() {
        const { user, users } = this.props;

        if (users.isLoading) {
            return (
                <p>Loading users...</p>
            );
        }

        if (users.list.length === 0) {
            return (
                <p>You have no users.</p>
            );
        }

        return (
            <UserTable users={users.list} />
        );
    }

}

function select(state) {
    return {
        users: state.users
    };
}
export default connect(select)(UsersList)
