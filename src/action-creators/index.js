import * as constants from '../constants/AuthEvents';
import * as auth from '../constants/Auth';
import request from '../utils/request';
import Cookie from 'js-cookie';

export function applicationLoaded(data) {
    const token = Cookie.get(auth.COOKIE_NAME);

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
            .set(auth.AUTH_HEADER, token)
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
                if (error) {
                    dispatch(loginFailed());
                } else {
                    Session.set(auth.COOKIE_NAME, data.token);
                    window.location.reload();
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
    const token = Cookie.get(auth.COOKIE_NAME);

    return dispatch => {
        dispatch({
            type: constants.USER_FETCHED,
            data,
        });

        return request
            .set(auth.AUTH_HEADER, token)
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
