import { InputField, TextAreaField, SelectField } from 'react-semantic-redux-form';

const issueTypes = [
    { key: 'select', value: '', text: 'Choose Issue Type' },
    { key: 'Task', value: 'Task', text: 'Task' },
    { key: 'Bug', value: 'Bug', text: 'Bug' }
]

const issuePriority = [
    { key: 'select', value: '', text: 'Choose Issue Priority' },
    { key: 'LOW', value: 'LOW', text: 'LOW' },
    { key: 'MEDIUM', value: 'MEDIUM', text: 'MEDIUM' },
    { key: 'HIGH', value: 'HIGH', text: 'HIGH' }
]

export const projectFields = [
    { name: 'title', label: 'Title', placeholder: 'Enter Project Title', type: 'text', component: InputField, key: '1', value: 'Test' },
    { name: 'type', label: 'Type', placeholder: 'Enter Project Type', type: 'text', component: InputField, key: '2', value: 'Test'  },
    { name: 'abbreviation', label: 'Abbreviation', placeholder: 'Enter Project Abbreviation', type: 'text', component: InputField, key: '3', value: 'Test'  },
    { name: 'description', label: 'Description', placeholder: 'Enter Project Description', type: 'text', component: TextAreaField, key: '4', value: 'Test'  }
]

export const createUserFields = [
    { name: 'username', placeholder: 'Enter Username', label: 'Username', type: 'text', component: InputField, key: '5' },
    { name: 'firstName', placeholder: 'Enter First Name', label: 'First Name', type: 'text', component: InputField, key: '6' },
    { name: 'lastName', placeholder: 'Enter Last Name', label: 'Last Name', type: 'text', component: InputField, key: '7' },
    { name: 'password', placeholder: 'Enter Password', label: 'Password', type: 'password', component: InputField, key: '8' },
    { name: 'confirmPass', placeholder: 'Confirm Password', label: 'Confirm Password', type: 'password', component: InputField, key: '9' }
]

export const issueFields = [
    { name: 'summary', placeholder: 'Enter Issue Summary', label: 'Issue Summary', type: 'text', component: InputField, key: '10' },
    { name: 'description', placeholder: 'Enter Issue Description', label: 'Issue Description', type: 'text', component: TextAreaField, key: '11' },
    { name: 'issueType', placeholder: 'Enter Issue Type', label: 'Issue Type', type: 'text', options: issueTypes, component: SelectField, key: '12' },
    { name: 'priority', placeholder: 'Enter Issue Priority', label: 'Issue Priority', type: 'text', options: issuePriority, component: SelectField, key: '13' },
    { name: 'assignee', placeholder: 'Select Assignee', label: 'Assignee', type: 'text', options: 'assignee', component: SelectField, key: '14' }
]