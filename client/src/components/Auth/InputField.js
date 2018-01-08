import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react'

export default class InputField extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                {this.renderInputFields()}
            </div>
        )
    }

    renderInputFields(){
        const { fields, input, meta: { error, touched } } = this.props;

        return (
            <div  style={{ margin: '0' }}>
            <Form.Input
                fluid
                { ...fields }
                { ...input }
            />
            <Header 
                size='tiny' 
                color='red' 
                style={{ margin: '0' }} 
                textAlign='center'
            >
                {touched && error}
            </Header>
            </div>
        )
    }
}