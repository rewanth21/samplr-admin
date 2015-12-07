import React, { Component } from 'react'
import UpdateGroupForm from '../components/UpdateGroupForm';
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
        updateGroupForm: state.updateGroupForm,
    };
}

function getActionCreator (dispatch) {
    return bindActionCreators({
        getGroup: actionCreators.getGroup,
        updateGroup: actionCreators.updateGroup
    }, dispatch);
}

class UpdateGroupContainer extends Component {
    componentWillMount () {
        this.props.getGroup(this.props.routeParams.id);
    }
    render() {
        const { updateGroupForm, updateGroup, group, dispatch } = this.props;

        if (group.isLoading) {
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
                        <BreadcrumbItem active>
                            Update Group <i>{group.item.name}</i>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1>Update Group <i>{group.item.name}</i></h1>
                    <UpdateGroupForm
                        group={group.item}
                        updateGroupForm={updateGroupForm}
                        updateGroup={updateGroup} />
                </Panel>
            </div>
        )
    }
}

export default connect(select, getActionCreator)(UpdateGroupContainer);
