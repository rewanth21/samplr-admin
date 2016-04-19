import React, { Component, PropTypes } from 'react';
import * as ENUMS from '../constants/Enums';
import { Input, Button, Panel, Well, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import _ from 'lodash';
import {reduxForm} from 'redux-form';

const formFields = [
    'title',
    'questionType',
    'responses[].responseTitle',
    'responses[].responseValue',
    'isBranchQuestion'
]

class SurveyQuestionsForm extends Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        history: PropTypes.object
    };

    static propTypes = {
        addSurveyQuestionsForm: PropTypes.object.isRequired
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        let responses = [];

        if (this.props.fields.questionType.value == "slider") {
            responses.push({
                value: "1",
                text: "less than 5"
            })

            responses.push({
                value: "6",
                text: "greater than 5"
            })
        }
        else {
            this.props.fields.responses.forEach((resp) => {
                responses.push({
                    value: resp.responseValue.value,
                    text: resp.responseTitle.value
                })
            });
        }
        const question = {
            title: this.props.fields.title.value,
            questionType: this.props.fields.questionType.value,
            responses,
            surveyId: this.props.surveyId,
            isBranchQuestion: this.props.fields.isBranchQuestion.value
        }

        this.props.addSurveyQuestion(question);
        document.getElementById("questionType").value = "select"
        this.props.resetForm();
    }


    render() {
        const {
            fields: { title, questionType, responses, isBranchQuestion },
            submitting,
            addSurveyQuestionsForm: { isLoading, error}
        } = this.props;


        let errorMessage = null;
        if (error) {
            errorMessage = (
                <Alert bsStyle="danger">
                    <p>{error}</p>
                </Alert>
            );
        }
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div>
                    <label htmlFor="title">
                        Question Title
                    </label>
                    <Input type='text'
                        className="form-control"
                        id='title'
                        ref="title"
                        placeholder="Enter a title for this question"
                        {...title}/>

                </div>

                <div>
                    <label htmlFor="questionType">
                        Question type
                    </label>
                    <select id ="questionType" className="form-control" {...questionType} >
                        <option value={"select"} >Select</option>
                        <option value={"checkbox"}>Checkbox</option>
                        <option value={"radiobutton"}>Radiobutton</option>
                        <option value={"slider"}>Slider</option>
                    </select>
                    <br />
                </div>

                <b>Responses</b><br />

                {this.props.fields.questionType.value == "slider" &&
                    <div className="row">
                        <div className="col-md-1 "><label class="col-md-2 control-label">1</label></div>
                        <div className="col-md-4">
                            <input type="range" step="1" min="1" max="10"></input>
                        </div>
                        <div className="col-md-1 text-right"><label class="col-md-2 control-label">10</label></div>
                        <div className="col-md-4"><label>Default slider range: 1 to 10 with 10 being highest</label></div>
                    </div>
                    
                }

                {this.props.fields.questionType.value !== "slider" &&
                    <Well>
                        {!responses.length && <div>No responses</div>}
                        <div>
                            <ListGroup>
                                {responses.map((response, index) => {
                                    return (
                                        <ListGroupItem key={index}>
                                            <div className="form-horizontal">
                                                <div className="row" style={{ marginBottom: 10 }}>
                                                    <div className="col-md-6">
                                                        <b>Response #{index + 1}</b><br />
                                                    </div>
                                                    <div className="col-md-6 text-right">
                                                        <button className="btn btn-danger btn-sm" type="button"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                responses.removeField(index);
                                                            } }>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-sm-2 control-label">
                                                        Response Text
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input type="title"
                                                            className="form-control"
                                                            {...response.responseTitle}
                                                            placeholder="Ask your question here" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-2 control-label">
                                                        Response Value
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input type="number"
                                                            className="form-control"
                                                            {...response.responseValue}
                                                            placeholder="This is a number that represents the response" />
                                                    </div>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    );
                                }) }
                            </ListGroup>


                            <div>
                                <button className="btn btn-default" onClick={(e) => {
                                    e.preventDefault();
                                    responses.addField();
                                } }>
                                    Add response
                                </button>
                            </div>

                        </div>

                    </Well>
                }
                <Input type='checkbox'
                    id='isBranchQuestion'
                    ref="isBranchQuestion"
                    label="Is this a sub question?"
                    help={<span>If checked, this question will be added as sub question</span>}
                    placeholder="Password for the user"
                    {...isBranchQuestion}/>

                {errorMessage}

                <Button type="submit"
                    bsStyle="primary"
                    disabled={isLoading}>
                    { isLoading ? <span>Loading...</span> : <span>Add Question</span> }
                </Button>
            </form>
        );
    }

}

export default reduxForm({
    form: 'deep',
    fields: formFields
})(SurveyQuestionsForm);
