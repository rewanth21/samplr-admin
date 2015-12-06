import React, { Component } from 'react'
import CreateSurveyForm from '../components/CreateSurveyForm';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function select(state) {
    return {
        group: state.group,
        survey: state.survey
    };
}

class AddSurveyQuestionsPage extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.groupId);
        this.props.getSurvey(this.props.surveyId);
    }

    render (){
        const { addSurveyQuestionForm, group, survey, dispatch } = this.props;

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

                <h1>Add Survey Questions</h1>
                <SurveyQuestionsForm addSurveyQuestionForm={addSurveyQuestionForm}
                    groupId={this.props.groupId}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </Panel>
        );
    }
}

class AddSurveyQuestionsContainer extends Component {

    render() {
        const { group, survey, dispatch } = this.props;

        return (
            <div className="container">
                <AddSurveyQuestionsPage
                    groupId={this.props.routeParams.groupId}
                    surveyId={this.props.routeParams.surveyId}
                    group={group}
                    survey={survey}
                    dispatch={dispatch}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </div>
        )
    }
}

export default connect(select)(AddSurveyQuestionsContainer);
