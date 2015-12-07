import React, { Component, PropTypes } from 'react';
import { Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

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
            <Table striped bordered condensed>
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
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={'/group/'+group.id}>
                                        {group.name}
                                    </Link>
                                </td>
                                <td>{group.created}</td>
                                <td>
                                    <ButtonToolbar>
                                        <ButtonGroup bsSize="xsmall">
                                            <LinkContainer to={'/create-survey/'+group.id}>
                                                <Button>Create Survey</Button>
                                            </LinkContainer>
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
