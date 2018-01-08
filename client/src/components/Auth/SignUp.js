import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Form } from 'semantic-ui-react';
import InputField from './InputField';
import { signUpFields } from './formFields';
import * as actions from '../../actions';

class SignUp extends Component {
    renderFields(){
        return _.map(signUpFields, field => 
            <Field key={field.name} component={InputField}
            type="text"
            name={field.name}
            fields={field}
            />
        )
    }

    render(){
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit(this.props.signUp)}>
                    <Header as='h3' color='blue' textAlign='center'>
                        {' '}Create a New Account
                    </Header>
                    {this.renderFields()}
                    <Button type="submit" color='blue' fluid size='large'>Login</Button>
                </Form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    console.log(values);

    _.each(signUpFields, ({ name }) => {

		if(!values[name]){
			errors[name] = `You must provide a ${name}`;
		}
    })
    
    return errors;
}

SignUp = connect(null, actions)(SignUp);

export default reduxForm({
    validate,
    form: 'signUpForm'
})(SignUp);