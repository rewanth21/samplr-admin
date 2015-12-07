import React, { Component } from 'react'
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SurveyQuestionsForm from '../components/SurveyQuestionsForm';
import SurveyQuestionsList from '../components/SurveyQuestionsList';

function select(state) {
    return {
        group: state.group,
        survey: state.survey,
        addSurveyQuestionsForm: state.addSurveyQuestionsForm
    };
}

class AddSurveyQuestionsPage extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.groupId);
        this.props.getSurvey(this.props.surveyId);
    }

    render (){
        const {
            addSurveyQuestionsForm,
            group,
            survey,
            dispatch,
            surveyId
        } = this.props;

        if (group.isLoading || survey.isLoading) {
            return (<span>Loading...</span>);
        }

        return (
            <Panel>
                <Breadcrumb>
                    <LinkContainer to="/groups">
                        <BreadcrumbItem>
                            Groups
                        </BreadcrumbItem>
                    </LinkContainer>
                    <LinkContainer to={'/group/'+group.item.id}>
                        <BreadcrumbItem>
                            Group <i>{group.item.name}</i>
                        </BreadcrumbItem>
                    </LinkContainer>
                    <BreadcrumbItem active>
                        Survey <i>{survey.item.name}</i>
                    </BreadcrumbItem>
                </Breadcrumb>

                <h1>Survey <i>{survey.item.name}</i></h1>
                <h2>Current Questions</h2>
                <SurveyQuestionsList
                    surveyId={surveyId}
                    survey={survey}
                    {...bindActionCreators(actionCreators, dispatch)} />
                <h2>Add Questions</h2>
                <SurveyQuestionsForm
                    addSurveyQuestionsForm={addSurveyQuestionsForm}
                    surveyId={surveyId}
                    groupId={this.props.groupId}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </Panel>
        );
    }
}

class AddSurveyQuestionsContainer extends Component {

    render() {
        const { addSurveyQuestionsForm, group, survey, dispatch } = this.props;

        return (
            <div className="container">
                <AddSurveyQuestionsPage
                    groupId={this.props.routeParams.groupId}
                    surveyId={this.props.routeParams.surveyId}
                    group={group}
                    addSurveyQuestionsForm={addSurveyQuestionsForm}
                    survey={survey}
                    dispatch={dispatch}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </div>
        )
    }
}

export default connect(select)(AddSurveyQuestionsContainer);
