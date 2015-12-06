import * as constants from '../constants/AuthEvents';
import * as apiConstants from '../constants/APIEvents';
import * as authConstants from '../constants/Auth';
import request from '../utils/request';
import Cookie from 'js-cookie';
import { updatePath } from 'redux-simple-router'

// AUTH actions

export function applicationLoaded(data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    // if the visitor doesn't have an auth token cookie,
    // show them a login page
    if (!token) {
        console.log('No token!');
        return dispatch => {
            dispatch(userFetchFailed())
        }
    }

    // otherwise, verify that it's correct
    return dispatch => {
        dispatch({
            type: constants.APPLICATION_LOADED,
            data,
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/me')
            .end((err, res={}) => {
                const { body } = res;

                // if there's an error, the user isn't authorized
                if (err) {
                    dispatch(userFetchFailed());
                } else {
                    // make sure the user is a researcher
                    if (body.type === 'RESEARCHER') {
                        dispatch(userFetchSucceeded(body));
                    } else {
                        dispatch(userFetchFailed())
                    }
                }
            });
    };
}

export function loginSubmitted(data) {
    return dispatch => {
        dispatch({
            type: constants.LOGIN_SUBMITTED,
            data,
        });

        return request
            .post(API_ROOT + '/auth/login')
            .send(JSON.stringify(data))
            .end((err, res) => {
                const { body } = res;

                if (err) {
                    dispatch(loginFailed());
                } else {
                    Cookie.set(authConstants.AUTH_COOKIE, body.token);
                    window.location.reload();
                    //dispatch(updatePath('/'));
                }
            });
    };
}

export function loginFailed(data) {
    return {
        type: constants.LOGIN_FAILED,
        data,
    };
}

export function userFetched(data) {
    // at this point, we can assume that the cookie exists and is valid
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: constants.USER_FETCHED,
            data,
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/me')
            .end((err, res={}) => {
                const { body } = res;

                err ?
                    dispatch(userFetchFailed()) :
                    dispatch(userFetchSucceeded(body));
            });
    };
}

export function userFetchSucceeded(data) {
    return {
        type: constants.USER_FETCH_SUCCEEDED,
        data,
    };
}

export function userFetchFailed(data) {
    return {
        type: constants.USER_FETCH_FAILED,
        data,
    };
}


export function userLogout(data) {
    Cookie.remove(authConstants.AUTH_COOKIE);
    return {
        type: constants.TOKEN_DELETED,
        data,
    };
}

// GROUPS

export function userGetGroups (userId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);
    console.log('get groups');

    return dispatch => {
        dispatch({
            type: apiConstants.GET_GROUPS,
            userId,
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/user/'+userId+'/group')
            .end((err, res={}) => {
                const { body } = res;

                err ?
                    dispatch(userGetGroupsFailed()) :
                    dispatch(userGetGroupsSucceeded(body));
            });
    };
}

export function userGetGroupsFailed () {
    return {
        type: apiConstants.GET_GROUPS_FAILED
    };
}

export function userGetGroupsSucceeded (data) {
    return {
        type: apiConstants.GET_GROUPS_SUCCEEDED,
        data,
    };
}


// GET GROUP

export function getGroup (groupId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);
    console.log('get group');

    return dispatch => {
        dispatch({
            type: apiConstants.GET_GROUP,
            groupId,
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/group/'+groupId)
            .end((err, res={}) => {
                const { body } = res;

                err ?
                    dispatch(getGroupFailed()) :
                    dispatch(getGroupSucceeded(body));
            });
    };
}

export function getGroupFailed () {
    return {
        type: apiConstants.GET_GROUP_FAILED
    };
}

export function getGroupSucceeded (data) {
    return {
        type: apiConstants.GET_GROUP_SUCCEEDED,
        data,
    };
}


// CREATE GROUP

export function createGroup (data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.CREATE_GROUP,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .post(API_ROOT + '/group')
            .send(JSON.stringify(data))
            .end((err, res={}) => {
                const { body } = res;

                if (err) {
                    dispatch(createGroupFailed())
                } else {
                    dispatch(createGroupSucceeded(body));
                    dispatch(updatePath('/groups'));
                }
            });
    };
}

export function createGroupFailed (data) {
    return {
        type: apiConstants.CREATE_GROUP_FAILED,
        data
    };
}

export function createGroupSucceeded (data) {
    return {
        type: apiConstants.CREATE_GROUP_SUCCEEDED,
        data,
    };
}

// SURVEYS

export function getGroupSurveys (groupId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_GROUP_SURVEYS,
            groupId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/group/'+groupId+'/survey')
            .end((err, res={}) => {
                const { body } = res;

                if (err) {
                    dispatch(getGroupSurveysFailed())
                } else {
                    dispatch(getGroupSurveysSucceeded(body));
                }
            });
    };
}

export function getGroupSurveysFailed (data) {
    return {
        type: apiConstants.GET_GROUP_SURVEYS_FAILED,
        data
    };
}

export function getGroupSurveysSucceeded (data) {
    return {
        type: apiConstants.GET_GROUP_SURVEYS_SUCCEEDED,
        data,
    };
}

// USERS

export function getUsers (researcherId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_USERS,
            researcherId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/user/'+researcherId+'/user')
            .end((err, res={}) => {
                const { body } = res;

                if (err) {
                    dispatch(getUsersFailed())
                } else {
                    dispatch(getUsersSucceeded(body));
                }
            });
    };
}

export function getUsersFailed (data) {
    return {
        type: apiConstants.GET_USERS_FAILED,
        data
    };
}

export function getUsersSucceeded (data) {
    return {
        type: apiConstants.GET_USERS_SUCCEEDED,
        data,
    };
}


// CREATE SURVEY
export function createSurvey (data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.CREATE_SURVEY,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .post(API_ROOT + '/survey')
            .send(JSON.stringify(data))
            .end((err, res={}) => {
                const { body } = res;

                if (err) {
                    dispatch(createSurveyFailed())
                } else {
                    dispatch(createSurveySucceeded(body));
                    dispatch(updatePath('group/'+data.groupId+'/survey/'+data.id+'/add-questions'));
                }
            });
    };
}

export function createSurveyFailed (data) {
    return {
        type: apiConstants.CREATE_SURVEY_FAILED,
        data
    };
}

export function createSurveySucceeded (data) {
    return {
        type: apiConstants.CREATE_SURVEY_SUCCEEDED,
        data,
    };
}


// GET SURVEY
export function getSurvey (surveyId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_SURVEY,
            surveyId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/survey/'+surveyId)
            .end((err, res={}) => {
                const { body } = res;
                if (err) {
                    dispatch(getSurveyFailed())
                } else {
                    dispatch(getSurveySucceeded(body));
                }
            });
    };
}

export function getSurveyFailed (data) {
    return {
        type: apiConstants.GET_SURVEY_FAILED,
        data
    };
}

export function getSurveySucceeded (data) {
    return {
        type: apiConstants.GET_SURVEY_SUCCEEDED,
        data,
    };
}


// GET SURVEY
export function getSurveyQuestions (surveyId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_SURVEY_QUESTIONS,
            surveyId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/survey/'+surveyId+'/question')
            .end((err, res={}) => {
                const { body } = res;
                if (err) {
                    dispatch(getSurveyQuestionsFailed())
                } else {
                    dispatch(getSurveyQuestionsSucceeded(body));
                }
            });
    };
}

export function getSurveyQuestionsFailed (data) {
    return {
        type: apiConstants.GET_SURVEY_QUESTIONS_FAILED,
        data
    };
}

export function getSurveyQuestionsSucceeded (data) {
    return {
        type: apiConstants.GET_SURVEY_QUESTIONS_SUCCEEDED,
        data,
    };
}


// ADD SURVEY QUESTION
export function addSurveyQuestion (data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.ADD_SURVEY_QUESTION,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .post(API_ROOT + '/question')
            .send(JSON.stringify(data))
            .end((err, res={}) => {
                const { body } = res;
                if (err) {
                    dispatch(addSurveyQuestionFailed())
                } else {
                    dispatch(addSurveyQuestionSucceeded(body));
                }
            });
    };
}

export function addSurveyQuestionFailed (data) {
    return {
        type: apiConstants.ADD_SURVEY_QUESTION_FAILED,
        data
    };
}

export function addSurveyQuestionSucceeded (data) {
    return {
        type: apiConstants.ADD_SURVEY_QUESTION_SUCCEEDED,
        data,
    };
}
