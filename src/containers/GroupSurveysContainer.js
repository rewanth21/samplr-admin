import React, { Component, PropTypes } from 'react'
import SurveyList from '../components/SurveyList';
import * as actionCreators from '../action-creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Panel } from 'react-bootstrap';

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
        const group = _.findWhere(groups.list, { id: groupId});
        console.log(group);

        return (
            <div className="container">
                <Panel>
                    <h1>Surveys in group <i>{groupId}</i></h1>
                    <SurveyList groupId={groupId} surveys={surveys}
                        {...bindActionCreators(actionCreators, dispatch)} />
                </Panel>
            </div>
        )
    }
}

export default connect(select)(GroupSurveysContainer);
