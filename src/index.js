import React, { Component } from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux'
import * as reducers from './reducers';

import {
    ReduxRouter,
    routerStateReducer,
    reduxReactRouter,
    pushState
} from 'redux-router';

import { Router, Route, IndexRoute, Link } from 'react-router'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import { createHistory } from 'history';

import configureStore from './store/configureStore'

import AppContainer from './containers/AppContainer';
import DashboardContainer from './containers/DashboardContainer';
import Users from './containers/Users';
import NotFound from './containers/NotFound'

import thunkMiddleware from 'redux-thunk';
import createBrowserHistory from 'history/lib/createBrowserHistory'

const reducer = combineReducers({
    router: routerStateReducer,
    ...reducers
});

console.log(reducers);

function loggerMiddleware(next) {
    return next => action => {
        next(action);
    };
}

const store = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    reduxReactRouter({ createHistory }),
    devTools()
)(createStore)(reducer);

console.log(store.getState());


class Root extends Component {
    render () {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter history={createBrowserHistory()}>
                        <Route path='/' component={AppContainer}>
                            <IndexRoute component={DashboardContainer} />
                            <Route path='users' component={Users} />
                        </Route>
                        <Route path="*" component={NotFound}/>
                    </ReduxRouter>
                </Provider>
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            </div>
        );
    }
}

render(<Root />, document.getElementById('root'));
