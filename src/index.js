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
import GroupsContainer from './containers/GroupsContainer';
import GroupSurveysContainer from './containers/GroupSurveysContainer';
import CreateGroupsContainer from './containers/CreateGroupsContainer';
import CreateSurveyContainer from './containers/CreateSurveyContainer';
import ViewSurveyContainer from './containers/ViewSurveyContainer';
import AddSurveyQuestionsContainer from './containers/AddSurveyQuestionsContainer';
import AddSurveyUsersContainer from './containers/AddSurveyUsersContainer';
import UsersContainer from './containers/UsersContainer';
import UpdateGroupContainer from './containers/UpdateGroupContainer';
import UpdateSurveyContainer from './containers/UpdateSurveyContainer';
import CreateUserContainer from './containers/CreateUserContainer';
import AddBranchingQuestionContainer from './containers/AddBranchingQuestionContainer';
import NotFound from './containers/NotFound';

import thunkMiddleware from 'redux-thunk';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {reducer as formReducer} from 'redux-form';

const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer,
    form: formReducer
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
                        <Route component={AppContainer}>
                            <Route path='/' component={GroupsContainer} />
                            <Route path="groups/create" component={CreateGroupsContainer} />
                            <Route path="create-survey/:id" component={CreateSurveyContainer} />
                            <Route path="group/:groupId/survey/:surveyId/add-questions" component={AddSurveyQuestionsContainer} />
                            <Route path="group/:groupId/survey/:surveyId/add-users" component={AddSurveyUsersContainer} />
                            <Route path="group/:groupId/survey/:surveyId/update" component={UpdateSurveyContainer} />
                            <Route path="group/:groupId/survey/:surveyId" component={ViewSurveyContainer} />
                            <Route path="group/:id" component={GroupSurveysContainer} />
                            <Route path="group/:id/update" component={UpdateGroupContainer} />
                            <Route path='users/create' component={CreateUserContainer} />
                            <Route path='users' component={UsersContainer} />
                            <Route path="group/:groupId/survey/:surveyId/question/:questionId" component={AddBranchingQuestionContainer} />    
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
