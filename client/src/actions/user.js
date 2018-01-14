import axios from 'axios';
import { CREATE_USER, SIGN_UP_ERROR, GET_AFFILIATED, FETCH_USER,
    DELETE_USER, EDIT_USER, GET_SINGLE_USER, FETCH_USERS_ISSUES
} from './types';

export const createUser = values => async dispatch => {
    try {
        const res = await axios.post('/api/admin/createUser', values, 
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: CREATE_USER, payload: res });
    } catch(err){
        console.log(err);
    }
}

export const getSingleUser = userId => async dispatch => {
    try {
        const response = await axios.get(`/api/user/${userId}`,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: GET_SINGLE_USER, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const editUser = user => async dispatch => {
    try {
        const res = await axios.put(`/api/user/${user._id}`, user, 
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: EDIT_USER, payload: res });
    } catch(err){
        console.log(err);
    }
}

export const getAffiliatedUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/affiliated',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: GET_AFFILIATED, payload: res });
    } catch(err){
        console.log(err);
    }
}

export const fetchUser = () => async dispatch => {
    try {
        const response = await axios.get('/api/current_user',
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_USER, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const deleteUser = userId => async dispatch => {
    try {
        const response = await axios.delete(`/api/admin/user/${userId}`,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: DELETE_USER, payload: response });
    } catch(err){
        console.log(err);
    }
}

export const fetchUserIssues = userId => async dispatch => {
    try {
        const response = await axios.get(`/api/issue/getUserIssues/${userId}`,
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: FETCH_USERS_ISSUES, payload: response });
    } catch(err){
        console.log(err);
    }
}