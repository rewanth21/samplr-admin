import React, { Component, PropTypes } from 'react';
import * as ENUMS from '../constants/Enums';
import { Input, Button, Panel, Well, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import _ from 'lodash';
import {reduxForm} from 'redux-form';

const formFields = [
    'branchQuestionId',
    'responseId'
]

class BranchQuestionForm extends Component {
    constructor(props) {
        super(props);

    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        addBranchQuestionForm: PropTypes.object.isRequired,
        branchQuestionId: PropTypes.object.isRequired,
        responseId: PropTypes.object.isRequired
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const branchQuestionIdConstant = this.props.fields.branchQuestionId.value;
        const responseIdConstant = this.props.fields.responseId.value;

        if (!branchQuestionId || !responseId) {
            alert('Branch question and Response required.');
        }

        let request = {
            mainQuestionId: this.props.mainQuestionId,
            branchId: branchQuestionIdConstant,
            responseId: responseIdConstant,
            groupId: this.props.groupId,
            surveyId: this.props.surveyId
        };

        this.props.addBranchQuestion(request);
        this.props.resetForm();
    }

    render() {
        const {
            addBranchQuestionForm: {
                isLoading,
                error
            },
            fields: {branchQuestionId, responseId},
            submitting,
            surveyQuestions,
            survey,
            surveyId,
            group,
            groupId,
            mainQuestionId,
            mainQuestion
        } = this.props;

        let errorMessage = null;
        if (error) {
            errorMessage = (
                <Alert bsStyle="danger">
                    <h4>{error.title}</h4>
                    <p>{error}</p>
                </Alert>
            );
        }
        if (surveyQuestions.length === 0) {
            return (
                <p>
                    You have no questions assigned to you
                </p>
            );
        }

        var findQuestion = mainQuestion;

        var resposeList = findQuestion.responses;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-horizontal">
                <div className="form-group">
                        <label className="col-sm-2 control-label">
                            Branch for Response
                        </label>
                        <div className="col-sm-10">
                            <select id ="responseId" className="form-control" {...responseId}>
                                <option></option>
                                {resposeList.map((response, index) => {
                                    return (
                                        <option key={index}
                                            value={response.value}>
                                            {response.text}
                                        </option>
                                    );
                                }) }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">
                            Branch To
                        </label>
                        <div className="col-sm-10">
                            <select id ="branchQuestionId" className="form-control" {...branchQuestionId}>
                                <option></option>
                                {surveyQuestions.map((question, index) => {
                                    return (
                                        <option key={index}
                                            value={question.id}>
                                            {question.title}
                                        </option>

                                    );
                                }) }
                            </select>
                        </div>
                    </div>
                    
                </div>

                {errorMessage}

                <Button type="submit"
                    bsStyle="primary">
                    Add Branch
                </Button>
            </form>

        );
    }

}

export default reduxForm({
    form: 'simple',
    fields: formFields
})(BranchQuestionForm);
