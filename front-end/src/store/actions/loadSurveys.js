import * as actionTypes from './actionTypes';
import axios from '../../axios';

const loadSurveysAsync = (accessToken, currentPosts, reset) => {
    return dispatch => {
        dispatch(loadSurveysStart());

        axios.get('/user/surveys', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                currentPosts: currentPosts
            }
        })
        .then(res => {
            if (reset) {
                dispatch({type: actionTypes.SET_SURVEYS, surveys: []})
            }
            dispatch(loadSurveysSuccess(res.data.surveys, res.data.hasMore));
        })
        .catch(err => {
            console.log(err);
        });
    }
}

const loadSurveysStart = () => {
    return {type: actionTypes.LOAD_SURVEYS_START}
}

const loadSurveysSuccess = (surveys, hasMore) => {
    return {type: actionTypes.LOAD_SURVEYS_SUCCESS, surveys: surveys, hasMore: hasMore}
}

export default loadSurveysAsync;