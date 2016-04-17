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
            .end((err, res = {}) => {
                const { body } = res;

                // if there's an error, the user isn't authorized
                if (err) {
                    dispatch(userFetchFailed());
                } else {
                    // make sure the user is a researcher
                    if (body.type === 'RESEARCHER') {
                        dispatch(userFetchSucceeded(body));
                    } else {
                        dispatch(userFetchFailed());
                    }
                }
            });
    };
}

export function loginSubmitted(data, history) {
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
                    dispatch(loginFailed(body));
                } else {
                    Cookie.set(authConstants.AUTH_COOKIE, body.token, { expires: 14 });
                    window.location.reload();
                    dispatch(loginSucceeded())
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
            .end((err, res = {}) => {
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

export function userGetGroups(userId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_GROUPS,
            userId,
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/user/' + userId + '/group')
            .end((err, res = {}) => {
                const { body } = res;

                err ?
                    dispatch(userGetGroupsFailed()) :
                    dispatch(userGetGroupsSucceeded(body));
            });
    };
}

export function userGetGroupsFailed() {
    return {
        type: apiConstants.GET_GROUPS_FAILED
    };
}

export function userGetGroupsSucceeded(data) {
    return {
        type: apiConstants.GET_GROUPS_SUCCEEDED,
        data,
    };
}


// GET GROUP

export function getGroup(groupId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_GROUP,
            groupId,
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/group/' + groupId)
            .end((err, res = {}) => {
                const { body } = res;

                err ?
                    dispatch(getGroupFailed()) :
                    dispatch(getGroupSucceeded(body));
            });
    };
}

export function getGroupFailed() {
    return {
        type: apiConstants.GET_GROUP_FAILED
    };
}

export function getGroupSucceeded(data) {
    return {
        type: apiConstants.GET_GROUP_SUCCEEDED,
        data,
    };
}


// CREATE GROUP

export function createGroup(data) {
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
            .end((err, res = {}) => {
                const { body } = res;

                if (err) {
                    dispatch(createGroupFailed())
                } else {
                    dispatch(createGroupSucceeded(body));
                    dispatch(updatePath('/'));
                }
            });
    };
}

export function createGroupFailed(data) {
    return {
        type: apiConstants.CREATE_GROUP_FAILED,
        data
    };
}

export function createGroupSucceeded(data) {
    return {
        type: apiConstants.CREATE_GROUP_SUCCEEDED,
        data,
    };
}

// UPDATE GROUP

export function updateGroup(data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.UPDATE_GROUP,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .put(API_ROOT + '/group/' + data.id)
            .send(JSON.stringify(data.model))
            .end((err, res = {}) => {
                const { body } = res;

                if (err) {
                    dispatch(updateGroupFailed())
                } else {
                    dispatch(updateGroupSucceeded(body));
                    dispatch(updatePath('/group/' + data.id));
                }
            });
    };
}

export function updateGroupFailed(data) {
    return {
        type: apiConstants.UPDATE_GROUP_FAILED,
        data
    };
}

export function updateGroupSucceeded(data) {
    return {
        type: apiConstants.UPDATE_GROUP_SUCCEEDED,
        data,
    };
}

// SURVEYS

export function getGroupSurveys(groupId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_GROUP_SURVEYS,
            groupId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/group/' + groupId + '/survey')
            .end((err, res = {}) => {
                const { body } = res;

                if (err) {
                    dispatch(getGroupSurveysFailed())
                } else {
                    dispatch(getGroupSurveysSucceeded(body));
                }
            });
    };
}

export function getGroupSurveysFailed(data) {
    return {
        type: apiConstants.GET_GROUP_SURVEYS_FAILED,
        data
    };
}

export function getGroupSurveysSucceeded(data) {
    return {
        type: apiConstants.GET_GROUP_SURVEYS_SUCCEEDED,
        data,
    };
}

// USERS

export function getUsers(data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_USERS,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/user/' + data + '/user')
            .end((err, res = {}) => {
                const { body } = res;

                if (err) {
                    dispatch(getUsersFailed())
                } else {
                    dispatch(getUsersSucceeded(body));
                }
            });
    };
}

export function getUsersFailed(data) {
    return {
        type: apiConstants.GET_USERS_FAILED,
        data
    };
}

export function getUsersSucceeded(data) {
    return {
        type: apiConstants.GET_USERS_SUCCEEDED,
        data,
    };
}


// CREATE SURVEY
export function createSurvey(data) {
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
            .end((err, res = {}) => {
                const { body } = res;

                if (err) {
                    dispatch(createSurveyFailed())
                } else {
                    dispatch(createSurveySucceeded(body));
                    dispatch(updatePath('group/' + body.groupId + '/survey/' + body.id + '/add-questions'));
                }
            });
    };
}

export function createSurveyFailed(data) {
    return {
        type: apiConstants.CREATE_SURVEY_FAILED,
        data
    };
}

export function createSurveySucceeded(data) {
    return {
        type: apiConstants.CREATE_SURVEY_SUCCEEDED,
        data,
    };
}


// GET SURVEY
export function getSurvey(surveyId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_SURVEY,
            surveyId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/survey/' + surveyId)
            .end((err, res = {}) => {
                const { body } = res;
                if (err) {
                    dispatch(getSurveyFailed())
                } else {
                    dispatch(getSurveySucceeded(body));
                }
            });
    };
}

//ADD BRANCH QUESTION
export function addBranchQuestion(data) {
        var mainQuestionId = data.mainQuestionId;
        var tempdata = { expected: data.responseId, branchQuestionId: data.branchId };
        return dispatch => {
            dispatch({
                type: apiConstants.ADD_BRANCH_QUESTION,
                data
            });

            return request
                .put(API_ROOT + '/question/' + mainQuestionId + '/link')
                .send(JSON.stringify(tempdata))
                .end((err, res = {}) => {
                    const { body } = res;

                    if (err) {
                        dispatch(addBranchQuestionFailed(body));
                    } else {
                        dispatch(addBranchQuestionSucceeded(body));
                        dispatch(updatePath('/group/' + data.groupId + '/survey/' + data.surveyId));
                    }
                });
        };
}

export function addBranchQuestionFailed(data) {
    return {
        type: apiConstants.ADD_BRANCH_QUESTION_FAILED,
        data
    };
}

export function addBranchQuestionSucceeded(data) {
    return {
        type: apiConstants.ADD_BRANCH_QUESTION_SUCCEEDED,
        data
    };
}

export function getSurveyFailed(data) {
    return {
        type: apiConstants.GET_SURVEY_FAILED,
        data
    };
}

export function getSurveySucceeded(data) {
    return {
        type: apiConstants.GET_SURVEY_SUCCEEDED,
        data,
    };
}


// GET SURVEY QUESTIONS
export function getSurveyQuestions(surveyId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_SURVEY_QUESTIONS,
            surveyId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/survey/' + surveyId + '/question')
            .end((err, res = {}) => {
                const { body } = res;
                if (err) {
                    dispatch(getSurveyQuestionsFailed())
                } else {
                    dispatch(getSurveyQuestionsSucceeded(body));
                }
            });
    };
}

export function getSurveyQuestionsFailed(data) {
    return {
        type: apiConstants.GET_SURVEY_QUESTIONS_FAILED,
        data
    };
}

export function getSurveyQuestionsSucceeded(data) {
    return {
        type: apiConstants.GET_SURVEY_QUESTIONS_SUCCEEDED,
        data,
    };
}

// GET SURVEY RESPONSES
export function getSurveyResponses(surveyId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_SURVEY_RESPONSES,
            surveyId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/survey/' + surveyId + '/response')
            .end((err, res = {}) => {
                const { body } = res;
                if (err) {
                    dispatch(getSurveyResponsesFailed())
                } else {
                    dispatch(getSurveyResponsesSucceeded(body));
                }
            });
    };
}

export function getSurveyResponsesFailed(data) {
    return {
        type: apiConstants.GET_SURVEY_RESPONSES_FAILED,
        data
    };
}

export function getSurveyResponsesSucceeded(data) {
    return {
        type: apiConstants.GET_SURVEY_RESPONSES_SUCCEEDED,
        data,
    };
}


// ADD SURVEY QUESTION
export function addSurveyQuestion(data) {
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
            .end((err, res = {}) => {
                const { body } = res;
                if (err) {
                    dispatch(addSurveyQuestionFailed())
                } else {
                    dispatch(addSurveyQuestionSucceeded(body));
                }
            });
    };
}

export function addSurveyQuestionFailed(data) {
    return {
        type: apiConstants.ADD_SURVEY_QUESTION_FAILED,
        data
    };
}

export function addSurveyQuestionSucceeded(data) {
    return {
        type: apiConstants.ADD_SURVEY_QUESTION_SUCCEEDED,
        data,
    };
}


// GET SURVEY USERS
export function getSurveyUsers(surveyId) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.GET_SURVEY_USERS,
            surveyId
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .get(API_ROOT + '/survey/' + surveyId + '/user')
            .end((err, res = {}) => {
                const { body } = res;
                if (err) {
                    dispatch(getSurveyUsersFailed())
                } else {
                    dispatch(getSurveyUsersSucceeded(body));
                }
            });
    };
}

export function getSurveyUsersFailed(data) {
    return {
        type: apiConstants.GET_SURVEY_USERS_FAILED,
        data
    };
}

export function getSurveyUsersSucceeded(data) {
    return {
        type: apiConstants.GET_SURVEY_USERS_SUCCEEDED,
        data,
    };
}


// ADD SURVEY USER
export function addSurveyUser(data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.ADD_SURVEY_USER,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .put(API_ROOT + '/survey/' + data.surveyId + '/user')
            .send(JSON.stringify(data.data))
            .end((err, res = {}) => {
                const { body } = res;
                if (err) {
                    dispatch(addSurveyUserFailed())
                } else {
                    dispatch(addSurveyUserSucceeded(body));
                }
            });
    };
}

export function addSurveyUserFailed(data) {
    return {
        type: apiConstants.ADD_SURVEY_USER_FAILED,
        data
    };
}

export function addSurveyUserSucceeded(data) {
    return {
        type: apiConstants.ADD_SURVEY_USER_SUCCEEDED,
        data,
    };
}


// CREATE USER
export function createUser(isResearcher, data, whenDone) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    let apiUrl = '/auth/register/client';
    if (isResearcher === true) {
        apiUrl = '/auth/register';
    }

    return dispatch => {
        dispatch({
            type: apiConstants.CREATE_USER,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .post(API_ROOT + apiUrl)
            .send(JSON.stringify(data))
            .end((err, res = {}) => {
                const { body } = res;
                if (err) {
                    dispatch(createUserFailed(body))

                } else {
                    dispatch(createUserSucceeded(body));
                    dispatch(updatePath('/users'));
                    whenDone();
                }
            });
    };
}

export function createUserFailed(data) {
    return {
        type: apiConstants.CREATE_USER_FAILED,
        data
    };
}

export function createUserSucceeded(data) {
    return {
        type: apiConstants.CREATE_USER_SUCCEEDED,
        data,
    };
}


// UPDATE SURVEY

export function updateSurvey(data) {
    const token = Cookie.get(authConstants.AUTH_COOKIE);

    return dispatch => {
        dispatch({
            type: apiConstants.UPDATE_SURVEY,
            data
        });

        return request
            .set(authConstants.AUTH_HEADER, token)
            .put(API_ROOT + '/survey/' + data.surveyId)
            .send(JSON.stringify(data.model))
            .end((err, res = {}) => {
                const { body } = res;

                if (err) {
                    dispatch(createGroupFailed())
                } else {
                    dispatch(createGroupSucceeded(body));
                    dispatch(updatePath('/group/' + data.groupId));
                }
            });
    };
}

export function updateSurveyFailed(data) {
    return {
        type: apiConstants.UPDATE_SURVEY_FAILED,
        data
    };
}

export function updateSurveySucceeded(data) {
    return {
        type: apiConstants.UPDATE_SURVEY_SUCCEEDED,
        data,
    };
}
