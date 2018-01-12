import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Modal, Form } from 'semantic-ui-react';
import { createUserFields } from './modalFields';
import * as actions from '../../../actions/user';

class CreateUserModal extends Component {
    renderFields(){
        return createUserFields.map(user => 
                <Field 
                    {...user}
                    required
                />
        )
    }

    render() {
        return (
            <Modal trigger={<Button primary>Create New User</Button>}>
                <Modal.Header>Create a New User</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.props.handleSubmit(this.props.createUser)}>
                            {this.renderFields()}
                            <Button primary type='submit'>Submit</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function validate(values){
    return;
}

CreateUserModal = connect(null, actions)(CreateUserModal);

export default reduxForm({
    validate,
    form: 'createUserForm'
})(CreateUserModal);