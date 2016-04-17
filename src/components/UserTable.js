import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import DateFormat from './DateFormat';

export default class UserTable extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired
    }

    render () {
        let { users } = this.props;
        return (
            <Table striped bordered condensed>
                <thead>
                    <tr>
                        <th style={{width: 50}}>#</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.age}</td>
                                <td><DateFormat date={user.created} /></td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">
                            You have <b>{users.length}</b> users
                        </td>
                    </tr>
                </tfoot>
            </Table>
        )
    }
}
