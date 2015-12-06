import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

function select(state) {
    return {
        surveyResponses: state.surveyResponses
    };
}

class SurveyList extends Component {

    componentWillMount () {
        this.props.getSurveyResponses(this.props.surveyId);
    }


    render() {
        const { survey, surveyResponses } = this.props;

        if (surveyResponses.isLoading) {
            return (
                <p>Loading survey responses...</p>
            );
        }

        if (surveyResponses.list.length === 0) {
            return (
                <p>This survey has no responses.</p>
            );
        }

        return (
            <ListGroup>
                {surveyResponses.list.map((question, index) => {
                    return (
                        <ListGroupItem key={index}>
                            <b>{question.title}</b>
                            <ul>
                                {question.responses.map((resp, index) => {
                                    return (
                                        <li key={index}>
                                            {resp.value}: {resp.title}
                                        </li>
                                    );
                                })}
                            </ul>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        );
    }

}

export default connect(select)(SurveyList);
