import axios from 'axios';
import { GET_FEED } from './types';

export const getFeed = () => async dispatch => {
    try {
        const feed = await axios.get('/api/feed',
        { headers: { Authorization: localStorage.getItem('token') } })
        dispatch({ type: GET_FEED, payload: feed });
    } catch(err){
        console.log(err);
    }
}