import * as constants from '../constants/AuthEvents';
import * as apiConstants from '../constants/APIEvents';
import * as authConstants from '../constants/Auth';
import request from '../utils/request';
import Cookie from 'js-cookie';
import { updatePath } from 'redux-simple-router'

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
