import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';

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
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {user.email}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            You have <b>{users.length}</b> users
                        </td>
                    </tr>
                </tfoot>
            </Table>
        )
    }
}
