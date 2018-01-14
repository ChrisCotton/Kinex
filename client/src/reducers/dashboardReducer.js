import {
    FETCH_USER,
    FETCH_PROJECTS,
    FETCH_ALL_USERS,
    FETCH_ISSUES,
    CREATE_PROJECT,
    CREATE_USER,
    FETCH_PROJECT,
    DELETE_PROJECT,
    EDIT_PROJECT,
    FETCH_PROJECT_ISSUES,
    GET_AFFILIATED,
    CREATE_ISSUE,
    VIEW_ISSUE,
    FETCH_ISSUE,
    DELETE_USER,
    EDIT_USER,
    GET_SINGLE_USER,
    FETCH_USERS_ISSUES
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, user: action.payload.data };
        case FETCH_PROJECTS:
            return { ...state, projects: action.payload.data };
        case FETCH_ALL_USERS:
            return { ...state, allUsers: action.payload.data };
        case FETCH_ISSUES:
            return { ...state, issues: action.payload.data };
        case CREATE_PROJECT:
            return { ...state, projects: [...state.projects, action.payload.data] };
        case CREATE_USER:
            return { ...state, affiliated: [...state.affiliated, action.payload.data] };
        case DELETE_USER:
            return { ...state, affiliated: [...state.affiliated.filter(user => user._id !== action.payload.data._id)] }
        case EDIT_USER:
            return {
                ...state, affiliated: [...state.affiliated.map(user => {
                    if (user._id !== action.payload.data._id) {
                        return user;
                    } else if (user._id === action.payload.data._id) {
                        return { ...user, ...action.payload.data };
                    }
                })]
            }
        case CREATE_ISSUE:
            return { ...state, projectIssues: [...state.projectIssues, action.payload.data] };
        case FETCH_PROJECT:
            return { ...state, project: action.payload.data };
        case GET_AFFILIATED:
            return { ...state, affiliated: action.payload.data };
        case DELETE_PROJECT:
            return { ...state, projects: [...state.projects.filter(project => project._id !== action.payload.data._id)] }
        case EDIT_PROJECT:
            return {
                ...state, projects: [
                    ...state.projects.map((project) => {
                        if (project._id !== action.payload.data._id) {
                            return project;
                        } else if (project._id === action.payload.data._id) {
                            return { ...project, ...action.payload.data };
                        }
                    })
                ]
            };
        case FETCH_PROJECT_ISSUES:
            return { ...state, projectIssues: action.payload.data }
        case VIEW_ISSUE:
            return { ...state, showIssue: state.projectIssues.filter(issue => issue._id === action.payload)[0] };
        case FETCH_ISSUE:
            return { ...state, showIssue: action.payload.data };
        case GET_SINGLE_USER:
            return { ...state, currentUser: action.payload.data };
        case FETCH_USERS_ISSUES:
            return { ...state, usersIssues: action.payload.data };
        default:
            return state;
    }

    return state;
}