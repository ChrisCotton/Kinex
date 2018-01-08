import React from 'react';
import { Button, Form, Header } from 'semantic-ui-react'

const SignIn = () => {
    return (
        <div>
            <Header as='h3' color='blue' textAlign='center'>
                {' '}Welcome Back
            </Header>
            <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
            />
            <Button color='blue' fluid size='large'>Login</Button>
        </div>
    )
}

export default SignIn;