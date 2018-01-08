import axios from 'axios';
import { SIGN_UP } from './types';

export const signUp = values => async dispatch => {
    const user = {
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
    }

    const res = await axios.post('/auth/signUp', values);
}