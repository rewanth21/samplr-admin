import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

function select(state) {
    return {
        surveyQuestions: state.surveyQuestions
    };
}

class SurveyList extends Component {

    componentWillMount () {
        this.props.getSurveyQuestions(this.props.surveyId);
    }


    render() {
        const { survey, surveyQuestions } = this.props;

        if (surveyQuestions.isLoading) {
            return (
                <p>Loading survey questions...</p>
            );
        }

        if (surveyQuestions.list.length === 0) {
            return (
                <p>This survey has no questions.</p>
            );
        }

        return (
            <ListGroup>
                {surveyQuestions.list.map((question, index) => {
                    return (
                        <ListGroupItem key={index}>
                            <b>{question.title}</b>
                            <ul>
                                {question.responses.map((resp, index) => {
                                    return (
                                        <li key={index}>
                                            {resp.value}: {resp.text}
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
