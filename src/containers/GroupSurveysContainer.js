import React, { Component, PropTypes } from 'react'
import SurveyList from '../components/SurveyList';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Panel, Breadcrumb, BreadcrumbItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function select(state) {
    return {
        group: state.group,
        surveys: state.surveys
    };
}

class GroupsSurveysPage extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.id);
    }

    render () {
        const { dispatch, group, surveys, id } = this.props;
        if (group.isLoading) {
            return (<span>Loading...</span>);
        }
        return (
            <div>
                <Breadcrumb>
                    <LinkContainer to="/groups">
                        <BreadcrumbItem>
                            Groups
                        </BreadcrumbItem>
                    </LinkContainer>
                    <BreadcrumbItem active>
                        {group.item.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1>
                    Surveys in group <i>{group.item.name}</i>
                    <LinkContainer to={'/create-survey/'+id}>
                        <Button className="pull-right" bsStyle="primary">
                            Create New Survey
                        </Button>
                    </LinkContainer>
                </h1>
                <p>Click on a survey name to view its questions and responses.</p>
                <SurveyList groupId={id} surveys={surveys}
                    {...bindActionCreators(actionCreators, dispatch)} />
            </div>
        );
    }
}

class GroupSurveysContainer extends Component {
    render() {
        const { dispatch, groups, group, surveys } = this.props;
        const groupId = this.props.routeParams.id

        return (
            <div className="container">
                <Panel>
                    <GroupsSurveysPage
                        group={group}
                        surveys={surveys}
                        id={groupId}
                        dispatch={dispatch}
                        {...bindActionCreators(actionCreators, dispatch)}/>
                </Panel>
            </div>
        )
    }
}

export default connect(select)(GroupSurveysContainer);
