import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import { reduxRouteComponent } from 'redux-react-router';
import { store } from '../index.js';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import AppContainer from './AppContainer';
import DashboardContainer from './DashboardContainer';
import Users from './Users';
import NotFound from './NotFound'


export default class AppRouter {
    render() {
        return(
            <Router history={createBrowserHistory()}>
                <Redirect from='/' to='/dashboard' />
                <Route component={reduxRouteComponent(store)}>
                    <Route path='/' component={AppContainer}>
                        <Route path='dashboard' component={DashboardContainer} />
                        <Route path='users' component={Users} />
                    </Route>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        );
    }
}
