import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, Form } from 'semantic-ui-react';
import { projectFields } from './modalFields';
import * as actions from '../../../actions/project';

const formProps = {};

class ProjectModal extends Component {
    constructor(props){
        super(props);
    }

    renderFields() {
        return projectFields.map(project =>
                <Field
                    {...project}
                    required
                />
        )
    }

    renderButton(){
        if(this.props.editMode){
            formProps.title = 'Edit Project';
            formProps.action = 'Update';
            formProps.method = this.props.editProject;
            return <Button>Edit</Button>
        }

        formProps.title = 'Create a New Project';
        formProps.action = 'Submit';
        formProps.method = this.props.createProject;
        return <Button primary>Create New Project</Button>
    }

    render() {
        return (
            <Modal trigger={this.renderButton()}>
                <Modal.Header>{formProps.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.props.handleSubmit(formProps.method)}>
                            {this.renderFields()}
                            <Button primary type='submit'>{formProps.action}</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function validate(values) {
    const errors = {};
    _.each(projectFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    })

    return errors;
}

ProjectModal = connect(null, actions)(ProjectModal);

export default reduxForm({
    validate,
    enableReinitialize: true,
    form: 'none'
})(ProjectModal);