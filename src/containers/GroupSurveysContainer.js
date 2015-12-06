import React, { Component, PropTypes } from 'react'
import SurveyList from '../components/SurveyList';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Panel, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function select(state) {
    return {
        groups: state.groups,
        surveys: state.surveys
    };
}

class GroupSurveysContainer extends Component {
    render() {
        const { dispatch, groups, surveys } = this.props;
        const groupId = this.props.routeParams.id

        return (
            <div className="container">
                <Panel>
                    <Breadcrumb>
                        <LinkContainer to="groups">
                            <BreadcrumbItem>
                                Groups
                            </BreadcrumbItem>
                        </LinkContainer>
                        <BreadcrumbItem active>
                            {groupId}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1>Surveys in group <i>{groupId}</i></h1>
                    <SurveyList groupId={groupId} surveys={surveys}
                        {...bindActionCreators(actionCreators, dispatch)} />
                </Panel>
            </div>
        )
    }
}

export default connect(select)(GroupSurveysContainer);
