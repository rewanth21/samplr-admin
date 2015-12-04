import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router';
import { reduxRouteComponent } from 'redux-react-router';
import { store } from '../index.js';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { ReduxRouter } from 'redux-router';

import AppContainer from './AppContainer';
import DashboardContainer from './DashboardContainer';
import Users from './Users';
import NotFound from './NotFound'


export default class AppRouter extends Component {
    render() {
        return(
            <ReduxRouter history={createBrowserHistory()}>
                <Route path='/' component={AppContainer}>
                    <Route path='dashboard' component={DashboardContainer} />
                    <Route path='users' component={Users} />
                </Route>
                <Route path="*" component={NotFound}/>
            </ReduxRouter>
        );
    }
}
