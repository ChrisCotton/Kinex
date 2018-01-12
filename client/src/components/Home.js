import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

const FixedMenu = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active>Home</Menu.Item>
      <Menu.Item as='a'>Work</Menu.Item>
      <Menu.Item as='a'>Company</Menu.Item>
      <Menu.Item as='a'>Careers</Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          <Button as='a'>Log in</Button>
        </Menu.Item>
        <Menu.Item>
          <Button as='a' primary>Sign Up</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
)

export default class Home extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state

    return (
      <div>
        { visible ? <FixedMenu /> : null }

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ height: '100vh', padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Link to="/">
                <Menu.Item active>Home</Menu.Item>
                </Link>
                <Menu.Item position='right'>
                  <Link to="/signIn"><Button inverted>Sign In</Button></Link>
                  <Link to="/signIn"><Button inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button></Link>
                </Menu.Item>
              </Menu>
            </Container>

            <Container text>
              <Header
                as='h1'
                content='Kinex'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '4em' }}
              />
              <Header
                as='h4'
                content='Issue tracking System for your Development Needs'
                inverted
                style={{ fontSize: '1.3em', fontWeight: 'normal', marginTop: 0, marginBottom: 20 }}
              />
              <Link to="/signIn">
              <Button primary size='huge'>
                Get Started
                <Icon name='right arrow' />
              </Button>
              </Link>
            </Container>
          </Segment>
        </Visibility>
      </div>
    )
  }
}