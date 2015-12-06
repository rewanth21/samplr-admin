import React, { Component, PropTypes } from 'react';
import { Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default class GroupList extends Component {

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
            <Table striped bordered condensed>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.list.map((group, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {group.name}
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <ButtonGroup bsSize="xsmall">
                                            <Button>Foobar</Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            You have <b>{users.list.length}</b> users
                        </td>
                    </tr>
                </tfoot>
            </Table>
        );
    }

}
