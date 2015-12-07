import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import Dashboard from '../components/Dashboard';

function select(state) {
    return {
        user: state.user,
    };
}

class HomeContainer extends Component{

    render() {
        const { dispatch, user } = this.props;

        return (
            <Dashboard user={user} {...bindActionCreators(actionCreators, dispatch)} />
        );
    }

}

export default connect(select)(HomeContainer);
