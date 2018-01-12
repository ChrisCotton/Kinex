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
    VIEW_ISSUE
} from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_USER:
            return { ...state, user: action.payload.data };
        case FETCH_PROJECTS:
            return { ...state, projects: action.payload.data };
        case FETCH_ALL_USERS:
            return { ...state, allUsers: action.payload.data };
        case FETCH_ISSUES:
            return { ...state, issues: action.payload.data };
        case CREATE_PROJECT:
            return { ...state, projects: [ ...state.projects, action.payload.data ] };
        case CREATE_USER:
            return { ...state, allUsers: [ ...state.allUsers, action.payload.data ] };
        case CREATE_ISSUE:
            return { ...state, projectIssues: [ ...state.projectIssues, action.payload.data ] };
        case FETCH_PROJECT:
            return { ...state, project: action.payload.data };
        case GET_AFFILIATED:
            return { ...state, affiliated: action.payload.data };
        case DELETE_PROJECT:
            return { ...state, projects: [ ...state.projects.filter(project => project._id !== action.payload.data._id) ] }
        case EDIT_PROJECT:
            return { ...state, projects: [ 
                ...state.projects.map((project) => {
                    if(project._id !== action.payload.data._id){
                        return project;
                    } else if(project._id === action.payload.data._id){
                        return { ...project, ...action.payload.data };
                    }
                })
            ]};
        case FETCH_PROJECT_ISSUES:
            return { ...state, projectIssues: action.payload.data }
        case VIEW_ISSUE:
            return { ...state, showIssue: state.projectIssues.filter(issue => issue._id === action.payload)[0] }
        default:
            return state;
    }

    return state;
}