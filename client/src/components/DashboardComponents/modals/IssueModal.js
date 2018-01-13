import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, Form } from 'semantic-ui-react';
import { issueFields } from './modalFields';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/user';
import * as projectActions from '../../../actions/project';

class IssueModal extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.userActions.getAffiliatedUsers();
    }

    renderFields(){
        return issueFields.map((issue) => {
            if(issue.options === 'assignee' && this.props.affiliated){
                issue.options = this.props.affiliated.map((user) => {
                    return {
                        key: user._id,
                        value: user._id,
                        text: `${user.firstName} ${user.lastName}`
                    }
                })
            }
            return <Field 
                    {...issue}
                    required
                />
            }
        )
    }

    render() {
        return (
            <Modal trigger={<Button primary>Create New Issue</Button>}>
                <Modal.Header>Create a New Issue</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={ 
                            this.props.handleSubmit(values => 
                            this.props.projectActions.createIssue(values, this.props.projectId)) 
                        }>
                            {this.renderFields()}
                            <Button primary type='submit'>Submit</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function mapStateToProps(state){
    return {
        affiliated: state.dashboard.affiliated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        projectActions: bindActionCreators(projectActions, dispatch)
    }
}

function validate(values){
    const errors = {};
    _.each(issueFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    })

    return errors;
}

IssueModal = connect(mapStateToProps, mapDispatchToProps)(IssueModal);

export default reduxForm({
    validate,
    form: 'issueForm'
})(IssueModal);