import axios from 'axios';
import { CREATE_USER, SIGN_UP_ERROR, GET_AFFILIATED, FETCH_USER } from './types';

export const createUser = values => async dispatch => {
    try {
        const res = await axios.post('/api/admin/createUser', values, 
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: CREATE_USER, payload: res });
    } catch(err){
        dispatch({ type: SIGN_UP_ERROR, payload: err });
    }
}

export const editUser = values => async dispatch => {
    try {
        const res = await axios.post('/api/admin/createUser', values, 
        { headers: { Authorization: localStorage.getItem('token') } });
        dispatch({ type: CREATE_USER, payload: res });
    } catch(err){
        dispatch({ type: SIGN_UP_ERROR, payload: err });
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