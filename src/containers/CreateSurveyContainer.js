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
        createSurveyForm: state.createSurveyForm,
    };
}

class CreateSurveyPage extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.groupId);
    }

    render (){
        const { createSurveyForm, group, dispatch } = this.props;

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
                        New Survey
                    </BreadcrumbItem>
                </Breadcrumb>

                <h1>Create a new survey</h1>
                <CreateSurveyForm createSurveyForm={createSurveyForm}
                    groupId={this.props.groupId}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </Panel>
        );
    }
}

class CreateSurveyContainer extends Component {

    render() {
        const { createSurveyForm, group, dispatch } = this.props;



        return (
            <div className="container">
                <CreateSurveyPage
                    groupId={this.props.routeParams.id}
                    group={group}
                    createSurveyForm={createSurveyForm}
                    dispatch={dispatch}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </div>
        )
    }
}

export default connect(select)(CreateSurveyContainer);
