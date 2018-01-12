import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class SidebarMenu extends Component {
    render() {
        return (
            <Sidebar as={Menu} inverted animation='overlay' visible={true} icon='labeled' vertical>
                <Link to="/dashboard">
                    <Menu.Item name='home'>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                </Link>

                <Link to="/projects">
                    <Menu.Item name='tasks'>
                        <Icon name='tasks' />
                        Projects
                    </Menu.Item>
                </Link>

                <Link to="/dashboard">
                    <Menu.Item name='user'>
                        <Icon name='user' />
                        Users
                    </Menu.Item>
                </Link>

                <Link to="/dashboard">
                    <Menu.Item name='feed'>
                        <Icon name='feed' />
                        Feed
                    </Menu.Item>
                </Link>

                <Link to="/dashboard">
                    <Menu.Item name='settings'>
                        <Icon name='settings' />
                        Settings
                    </Menu.Item>
                </Link>

                <Link to="/" onClick={this.props.signOut}>
                    <Menu.Item name='log out'>
                        <Icon name='log out' />
                        Logout

                </Menu.Item>
                </Link>
            </Sidebar>
        )
    }
}

export default connect(null, actions)(SidebarMenu);