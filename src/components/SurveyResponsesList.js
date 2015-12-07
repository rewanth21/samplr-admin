import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

function select(state) {
    return {
        surveyQuestions: state.surveyQuestions,
        surveyResponses: state.surveyResponses
    };
}

class SurveyList extends Component {

    componentWillMount () {
        this.props.getSurveyQuestions(this.props.surveyId);
        this.props.getSurveyResponses(this.props.surveyId);
    }


    render() {
        const { survey, surveyQuestions, surveyResponses } = this.props;

        if (surveyQuestions.isLoading || surveyResponses.isLoading) {
            return (
                <p>Loading survey responses...</p>
            );
        }

        if (surveyResponses.list.length === 0) {
            return (
                <p>This survey has no responses.</p>
            );
        }

        console.log(surveyQuestions);
        console.log(surveyResponses.list);

        return (
            <div>
                <p>
                    There have been <b>{surveyResponses.list.length}</b> responses to this survey.
                </p>
                <ListGroup>
                    {surveyQuestions.list.map((question, index) => {
                        let questionResponses = _.filter(surveyResponses.list, (resp) => {
                            return resp.question.id === question.id;
                        });
                        console.log(questionResponses);
                        return (
                            <ListGroupItem key={index}>
                                <h3>{question.title}</h3>
                                <Table striped condensed>
                                    <thead>
                                        <tr>
                                            <th>Response Value</th>
                                            <th>Response Title</th>
                                            <th>#</th>
                                            <th>%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {question.responses.map((resp, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{resp.value}</td>
                                                    <td>{resp.title}</td>
                                                    <td>
                                                        {questionResponses.length}
                                                    </td>
                                                    <td>
                                                        {(questionResponses.length / surveyResponses.list.length) * 100}%
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }

}

export default connect(select)(SurveyList);
