import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import UserTable from './UserTable';

function select(state) {
    return {
        surveyUsers: state.surveyUsers
    };
}

class SurveyList extends Component {

    componentWillMount () {
        this.props.getSurveyUsers(this.props.surveyId);
    }


    render() {
        const { survey, surveyUsers } = this.props;

        if (surveyUsers.isLoading) {
            return (
                <p>Loading survey users...</p>
            );
        }

        if (surveyUsers.list.length === 0) {
            return (
                <p>This survey hasn't been sent to any users.</p>
            );
        }

        return (
            <UserTable users={surveyUsers.list} />
        );
    }

}

export default connect(select)(SurveyList);
