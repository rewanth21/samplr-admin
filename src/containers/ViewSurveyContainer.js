import React, { Component } from 'react'
import SurveyQuestionsList from '../components/SurveyQuestionsList';
import SurveyResponsesList from '../components/SurveyResponsesList';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import {
    Panel,
    Breadcrumb,
    BreadcrumbItem,
    ButtonToolbar,
    ButtonGroup,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import getExportURL from '../utils/export';

function select(state) {
    return {
        group: state.group,
        survey: state.survey
    };
}

class ViewSurveyPage extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.groupId);
        this.props.getSurvey(this.props.surveyId);
    }

    render (){
        const { createSurveyForm, group, survey, dispatch, surveyId } = this.props;

        if (group.isLoading) {
            return (<span>Loading...</span>);
        }

        return (
            <Panel>
                <Breadcrumb>
                    <LinkContainer to="/">
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

                <h1>
                    <span>View Survey <i>{survey.item.name}</i></span>
                    <div className="pull-right">
                        <ButtonToolbar>
                            <ButtonGroup bsSize="xsmall">
                                <LinkContainer to={'/group/'+group.item.id+'/survey/'+survey.item.id+'/add-questions'}>
                                    <Button>Add Questions</Button>
                                </LinkContainer>
                                <LinkContainer to={'/group/'+group.item.id+'/survey/'+survey.item.id+'/add-users'}>
                                    <Button>Add Users</Button>
                                </LinkContainer>
                                <Button href={getExportURL(survey.item)}
                                    target="_blank">
                                    Export CSV
                                </Button>
                                <LinkContainer to={'/group/'+group.item.id+'/survey/'+survey.item.id+'/update'}>
                                    <Button>Update Survey</Button>
                                </LinkContainer>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </h1>
                <h2>Questions</h2>
                <SurveyQuestionsList
                    surveyId={surveyId}
                    survey={survey}
                    {...bindActionCreators(actionCreators, dispatch)} />
                <h2>Responses</h2>
                <SurveyResponsesList
                    surveyId={surveyId}
                    survey={survey}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </Panel>
        );
    }
}

class ViewSurveyContainer extends Component {

    render() {
        const { group, survey, dispatch } = this.props;
        return (
            <div className="container">
                <ViewSurveyPage
                    groupId={this.props.routeParams.groupId}
                    group={group}
                    surveyId={this.props.routeParams.surveyId}
                    survey={survey}
                    dispatch={dispatch}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </div>
        )
    }
}

export default connect(select)(ViewSurveyContainer);
