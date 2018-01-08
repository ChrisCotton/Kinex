import React from 'react';
import { Form, Grid, Header, Tab } from 'semantic-ui-react'

import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';

const panes = [
    { menuItem: 'Sign In', render: () => <Tab.Pane><SignIn /></Tab.Pane> },
    { menuItem: 'Sign Up', render: () => <Tab.Pane><SignUp /></Tab.Pane> }
]

const Home = () => {
    return (
    <div className='login-form'>
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 90%;
        }
      `}</style>
        <Grid centered
              verticalAlign='middle' 
              columns={2} 
              style={{ height: '90%' }}
        >
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h1' color='black' textAlign='center'>
                        {' '}Kinex
                    </Header>
                        <Tab panes={panes}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
    )
}

export default Home;