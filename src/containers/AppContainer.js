import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../action-creators';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

function select(state) {
    return {
        user: state.user,
        loginForm: state.loginForm,
    };
}


class AppContainer extends Component {

    constructor(props) {
        super();
        const { dispatch } = props;
        console.log(this.props, this.context);
        dispatch(actionCreators.applicationLoaded());
    }

    render() {
        const { dispatch, user, loginForm, children } = this.props;

        const headerBlock = user.authenticated ?
            <Header user={user} {...bindActionCreators(actionCreators, dispatch)} /> :
            null;

        const contentBlock = user.authenticated ?
            (children) :
            (<LoginForm loginForm={loginForm} {...bindActionCreators(actionCreators, dispatch)} />);

        return (
            <div>
                {headerBlock}
                {contentBlock}
            </div>
        );
    }
}

export default connect(select)(AppContainer);
