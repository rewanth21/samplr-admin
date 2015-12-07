import React, { Component } from 'react'
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router'
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import _ from 'lodash';

import SurveyUsersForm from '../components/SurveyUsersForm';
import SurveyUsersList from '../components/SurveyUsersList';

function select(state) {
    return {
        user: state.user,
        group: state.group,
        survey: state.survey,
        users: state.users,
        surveyUsers: state.surveyUsers,
        addSurveyUserForm: state.addSurveyUserForm
    };
}

class AddSurveyUsersPage extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.groupId);
        this.props.getSurvey(this.props.surveyId);
        this.props.getSurveyUsers(this.props.surveyId);
        this.props.getUsers(this.props.userId);
    }

    render (){
        const {
            addSurveyUserForm,
            group,
            users,
            survey,
            surveyUsers,
            dispatch,
            surveyId
        } = this.props;

        if (group.isLoading || survey.isLoading || surveyUsers.isLoading) {
            return (<span>Loading...</span>);
        }

        let filteredUsers = {
            list: _.filter(users.list, (obj) => !_.findWhere(surveyUsers.list, obj)),
            isLoading: false
        };

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
                <hr />
                <h2>Current Users</h2>
                <SurveyUsersList
                    surveyId={surveyId}
                    survey={survey}
                    {...bindActionCreators(actionCreators, dispatch)} />
                <h2>Add Users to a Survey</h2>
                <SurveyUsersForm
                    users={filteredUsers}
                    addSurveyUserForm={addSurveyUserForm}
                    surveyId={surveyId}
                    groupId={this.props.groupId}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </Panel>
        );
    }
}

class AddSurveyUsersContainer extends Component {

    render() {
        const {
            addSurveyUserForm,
            group,
            survey,
            surveyUsers,
            dispatch,
            user,
            users
        } = this.props;

        return (
            <div className="container">
                <AddSurveyUsersPage
                    groupId={this.props.routeParams.groupId}
                    group={group}
                    surveyId={this.props.routeParams.surveyId}
                    survey={survey}
                    surveyUsers={surveyUsers}
                    userId={user.userId}
                    users={users}
                    addSurveyUserForm={addSurveyUserForm}
                    dispatch={dispatch}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </div>
        )
    }
}

export default connect(select)(AddSurveyUsersContainer);
