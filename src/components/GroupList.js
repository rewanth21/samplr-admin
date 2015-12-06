import React, { Component, PropTypes } from 'react';
import { Table, Button } from 'react-bootstrap';

export default class GroupList extends Component {

    componentWillMount () {
        this.props.userGetGroups(this.props.user.userId);
    }


    render() {
        const { user, groups } = this.props;

        if (groups.isLoading) {
            return (
                <p>Loading groups...</p>
            );
        }

        if (groups.list.length === 0) {
            return (
                <p>You have no groups.</p>
            );
        }

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.list.map((group, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{group.name}</td>
                                <td>{group.created}</td>
                                <td>
                                    <ButtonToolbar>
                                        <ButtonGroup bsSize="xsmall">
                                            <Button>Create Survey</Button>
                                            <Button>Edit Name</Button>
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
                            You have <b>{groups.list.length}</b> groups
                        </td>
                    </tr>
                </tfoot>
            </Table>
        );
    }

}
