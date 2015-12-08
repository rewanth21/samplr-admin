import React, { Component, PropTypes } from 'react';
import { Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import DateFormat from './DateFormat';
import getExportURL from '../utils/export';

export default class SurveyList extends Component {

    componentWillMount () {
        this.props.getGroupSurveys(this.props.groupId);
    }


    render() {
        const { user, surveys, groupId } = this.props;

        if (surveys.isLoading) {
            return (
                <p>Loading surveys...</p>
            );
        }

        if (surveys.list.length === 0) {
            return (
                <p>You have no surveys.</p>
            );
        }

        return (
            <Table striped bordered condensed>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Modified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {surveys.list.map((survey, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={'/group/'+groupId+'/survey/'+survey.id}>
                                        {survey.name}
                                    </Link>
                                </td>
                                <td>
                                    <DateFormat date={survey.created}/>
                                </td>
                                <td>
                                    <DateFormat date={survey.modified}/>
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <ButtonGroup bsSize="xsmall">
                                            <LinkContainer to={'/group/'+groupId+'/survey/'+survey.id+'/add-questions'}>
                                                <Button>Add Questions</Button>
                                            </LinkContainer>
                                            <LinkContainer to={'/group/'+groupId+'/survey/'+survey.id+'/add-users'}>
                                                <Button>Add Users</Button>
                                            </LinkContainer>
                                            <Button href={getExportURL(survey)}
                                                target="_blank">
                                                Export CSV
                                            </Button>
                                            <LinkContainer to={'/group/'+groupId+'/survey/'+survey.id+'/update'}>
                                                <Button>Update Survey</Button>
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
                        <td colSpan="5">
                            There have been <b>{surveys.list.length}</b> sent to this group.
                        </td>
                    </tr>
                </tfoot>
            </Table>
        );
    }

}
