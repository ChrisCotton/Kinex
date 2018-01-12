import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, Form } from 'semantic-ui-react';
import { createUserFields } from './modalFields';
import * as actions from '../../../actions/user';

const formProps = {};

class CreateUserModal extends Component {
    constructor(props){
        super(props);
    }

    renderFields(){
        return createUserFields.map(user => 
                <Field 
                    {...user}
                    required
                />
        )
    }

    renderButton(){
        if(this.props.editMode){
            formProps.title = 'Edit User';
            formProps.action = 'Update';
            formProps.method = this.props.createUser;
            return <Button>Edit</Button>
        }

        formProps.title = 'Create a New User';
        formProps.action = 'Submit';
        formProps.method = this.props.createUser;
        return <Button primary>Create New User</Button>
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

function validate(values){
    const errors = {};
    _.each(createUserFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    })

    return errors;
}

CreateUserModal = connect(null, actions)(CreateUserModal);

export default reduxForm({
    validate,
    enableReinitialize: true,
    form: 'none'
})(CreateUserModal);