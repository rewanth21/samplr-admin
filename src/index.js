import React, { Component } from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux'
import * as reducers from './reducers';

import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import { Router, Route, IndexRoute, Link } from 'react-router'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import { createHistory } from 'history';

import configureStore from './store/configureStore'

import AppContainer from './containers/AppContainer';
import DashboardContainer from './containers/DashboardContainer';
import GroupsContainer from './containers/GroupsContainer';
import GroupSurveysContainer from './containers/GroupSurveysContainer';
import CreateGroupsContainer from './containers/CreateGroupsContainer';
import CreateSurveyContainer from './containers/CreateSurveyContainer';
import UsersContainer from './containers/UsersContainer';
import NotFound from './containers/NotFound'

import thunkMiddleware from 'redux-thunk';
import createBrowserHistory from 'history/lib/createBrowserHistory'

const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
}))


function loggerMiddleware(next) {
    return next => action => {
        next(action);
    };
}

const store = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    devTools()
)(createStore)(reducer);

let history = createBrowserHistory();

syncReduxAndRouter(history, store);


class Root extends Component {
    render () {
        return (
            <div>
                <Provider store={store}>
                    <Router history={history}>
                        <Route path='/' component={AppContainer}>
                            <IndexRoute component={DashboardContainer} />
                            <Route path="groups" component={GroupsContainer} />
                            <Route path="groups/create" component={CreateGroupsContainer} />
                            <Route path="create-survey/:id" component={CreateSurveyContainer} />
                            <Route path="group/:id" component={GroupSurveysContainer} />
                            <Route path='users' component={UsersContainer} />
                        </Route>
                        <Route path="*" component={NotFound}/>
                    </Router>
                </Provider>
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
                </DebugPanel>
            </div>
        );
    }
}

render(<Root />, document.getElementById('root'));
