import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, Form } from 'semantic-ui-react';
import { issueFields } from './modalFields';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/user';
import * as projectActions from '../../../actions/project';

const formProps = {}; 

class IssueModal extends Component {
    constructor(props){
        super(props);
        this.state = { modalOpen: false };
    }

    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });

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

    renderButton(){
        if(this.props.editMode){
            formProps.title = 'Edit Issue';
            formProps.action = 'Update';
            formProps.method = (issue) => {
                this.props.projectActions.editIssue(issue);
                this.handleClose();
            }
            return <Button onClick={this.handleOpen}>Edit</Button>
        } else if(this.props.editMode === false){
            formProps.title = 'Create a New Issue';
            formProps.action = 'Submit';
            formProps.method = (values) => {
                this.props.projectActions.createIssue(values, this.props.projectId);
                this.handleClose();
            }
            return <Button primary onClick={this.handleOpen}>Create New Issue</Button>
        }
    }

    render() {
        return (
            <Modal open={this.state.modalOpen} onClose={this.handleClose} trigger={this.renderButton()}>
                <Modal.Header>{formProps.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.props.handleSubmit(values => { formProps.method(values) })}>
                            {this.renderFields()}
                            <Button primary type='submit'>{formProps.action}</Button>
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
    enableReinitialize: true,
    form: 'issueModal'
})(IssueModal);