import React, { Component } from 'react'
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import _ from 'lodash';

import BranchQuestionForm from '../components/BranchQuestionForm';

function select(state) {
    return {
        survey: state.survey,
        group: state.group,
        surveyQuestions: state.surveyQuestions,
        mainQuestionId: state.mainQuestionId,
        addBranchQuestionForm: state.addBranchQuestionForm
    };
}

class AddBranchQuestionPage extends Component {
    componentWillMount() {
        this.props.getSurvey(this.props.surveyId);
        this.props.getGroup(this.props.groupId);
        this.props.getSurveyQuestions(this.props.surveyId);
    }

    render() {
        const {addBranchQuestionForm, groupId, group, survey, surveyQuestions, surveyId, mainQuestionId, dispatch, mainQuestion} = this.props;

        if (survey.isLoading || surveyQuestions.isLoading) {
            return (<span>Loading...</span>);
        }

        var findQuestion = _.find(surveyQuestions.list, function(o) { return o.id == mainQuestionId; });

        //Get only questions with isBranchQuestion==true
        var branchQuestionDropdown = _.filter(surveyQuestions.list, function(o) { return o.isBranchQuestion == true });

        let filteredQuestions = [];
        //Filter already added branch question   
        if (findQuestion.branches !== null) {


            for (var i = 0; i < branchQuestionDropdown.length; i++) {
                var flag = false; // false -> not present
                for (var j = 0; j < findQuestion.branches.length; j++) {
                    if (findQuestion.branches[j].branchId == branchQuestionDropdown[i].id) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    filteredQuestions.push(branchQuestionDropdown[i]);
                }

            }

        }
        else {
            filteredQuestions = branchQuestionDropdown;
        }

        return (
            <Panel>
                <Breadcrumb>
                    <LinkContainer to="/">
                        <BreadcrumbItem>
                            Groups
                        </BreadcrumbItem>
                    </LinkContainer>
                    <LinkContainer to={'/group/' + group.item.id}>
                        <BreadcrumbItem>
                            Group <i>{group.item.name}</i>
                        </BreadcrumbItem>
                    </LinkContainer>
                    <LinkContainer to={'/group/' + group.item.id + '/survey/' + surveyId}>
                        <BreadcrumbItem>
                            Survey <i>{survey.item.name}</i>
                        </BreadcrumbItem>
                    </LinkContainer>
                </Breadcrumb>


                <h4>Question: <i>{findQuestion.title}</i></h4>
                <hr />
                <BranchQuestionForm
                    groupId={groupId}
                    group={group}
                    surveyId={surveyId}
                    survey={survey}
                    mainQuestionId={mainQuestionId}
                    mainQuestion={findQuestion}
                    surveyQuestions={filteredQuestions}
                    addBranchQuestionForm={addBranchQuestionForm}
                    {...bindActionCreators(actionCreators, dispatch) } />

            </Panel>
        );
    }
}

class AddBranchingQuestionContainer extends Component {

    render() {
        const {
            groupId,
            group,
            surveyId,
            addBranchQuestionForm,
            survey,
            surveyQuestions,
            dispatch,
            mainQuestionId,
            mainQuestion
        } = this.props;

        return (
            <div className="container">
                <AddBranchQuestionPage
                    groupId={this.props.routeParams.groupId}
                    group={group}
                    surveyId={this.props.routeParams.surveyId}
                    survey={survey}
                    surveyQuestions={surveyQuestions}
                    mainQuestionId={this.props.routeParams.questionId}
                    mainQuestion={mainQuestion}
                    addBranchQuestionForm={addBranchQuestionForm}
                    dispatch={dispatch}
                    {...bindActionCreators(actionCreators, dispatch) } />
            </div>
        )
    }
}

export default connect(select)(AddBranchingQuestionContainer);
