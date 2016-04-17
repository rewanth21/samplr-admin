import React, { Component } from 'react'
import UpdateSurveyForm from '../components/UpdateSurveyForm';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { getGroup } from '../action-creators';

function select(state) {
    return {
        group: state.group,
        survey: state.survey,
        updateSurveyForm: state.updateSurveyForm,
    };
}

function getActionCreator (dispatch) {
    return bindActionCreators({
        getGroup: actionCreators.getGroup,
        getSurvey: actionCreators.getSurvey,
        updateSurvey: actionCreators.updateSurvey
    }, dispatch);
}

class UpdateGroupContainer extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.routeParams.groupId);
        this.props.getSurvey(this.props.routeParams.surveyId);
    }
    render() {
        const { updateSurveyForm, updateSurvey, group, survey, dispatch } = this.props;

        if (group.isLoading || survey.isLoading) {
            return (<span>Loading...</span>);
        }


        return (
            <div className="container">
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
                        <LinkContainer to={'/group/'+group.item.id+'/survey/'+survey.item.id}>
                            <BreadcrumbItem>
                                Survey <i>{survey.item.name}</i>
                            </BreadcrumbItem>
                        </LinkContainer>
                        <BreadcrumbItem active>
                            Update Survey <i>{survey.item.name}</i>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1>Update Survey <i>{survey.item.name}</i></h1>
                    <UpdateSurveyForm
                        group={group.item}
                        survey={survey.item}
                        updateSurveyForm={updateSurveyForm}
                        updateSurvey={updateSurvey} />
                </Panel>
            </div>
        )
    }
}

export default connect(select, getActionCreator)(UpdateGroupContainer);
