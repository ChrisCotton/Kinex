import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Card, Grid, List } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as dashboardActions from '../actions/dashboard';
import * as authActions from '../actions/auth';
import { bindActionCreators } from 'redux';

const cardStyle = {
    height: '300px',
    margin: '10px'
}

class Landing extends Component {
    componentWillMount() {
        this.props.dashboardActions.fetchUser();
        this.props.dashboardActions.fetchProjects();
        this.props.dashboardActions.fetchAllUsers();
        this.props.dashboardActions.fetchIssues();
    }

    renderProjects() {
        if(!this.props.projects){
            return (
                <div>Loading...</div>
            )
        }
        return this.props.projects.map((project) => {
            const date = new Date(project.created);

            return (
                <List.Item key={project._id}>
                    <List.Icon name='check' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{project.title}</List.Header>
                        <List.Description as='a'>Created on {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</List.Description>
                    </List.Content>
                </List.Item>
            )
        })
    }

    renderAllUsers() {
        if(!this.props.allUsers){
            return (
                <div>Loading...</div>
            )
        }
        return this.props.allUsers.map((user) => {
            return (
                <List.Item key={user._id}>
                    <List.Icon name='check' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{user.firstName} {user.lastName}</List.Header>
                        <List.Description as='a'>{user._id}</List.Description>
                    </List.Content>
                </List.Item>
            )
        })
    }

    renderAllIssues(){
        if(!this.props.allIssues){
            return (
                <div>Loading...</div>
            )
        }
        return this.props.allIssues.map((issue) => {
            return (
                <List.Item key={issue._id}>
                    <List.Icon name='check' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{issue.summary}</List.Header>
                        <List.Description as='a'>{issue.description}</List.Description>
                    </List.Content>
                </List.Item>
            )
        })     
    }

    render() {
        const { user } = this.props;
        if (!this.props.user) {
            return <div>Loading</div>
        }

        return (
            <div style={{ height: '100vh' }}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
                        <Menu.Item name='home'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>

                        <Menu.Item name='gamepad'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>

                        <Link to="/" onClick={this.props.authActions.signOut}>
                            <Menu.Item name='external'>
                                <Icon name='external' />
                                Logout

                            </Menu.Item>
                        </Link>
                    </Sidebar>
                    <Grid columns={3} style={{ marginLeft: '12em' }}>
                        <Grid.Row>
                            <Card style={cardStyle}>
                                <Card.Content>
                                    <Card.Header><Header as='h1'>Welcome back, {user.firstName}</Header></Card.Header>
                                    <Card.Meta>Issues/Tasks</Card.Meta>
                                    <Card.Description>Tasks Assigned to you:</Card.Description>
                                    <List divided relaxed>
                                        {this.renderAllIssues()}
                                    </List>
                                </Card.Content>
                            </Card>
                            <Card style={cardStyle}>
                                <Card.Content>
                                    <Card.Header><Header as='h1'>Your Projects</Header></Card.Header>
                                    <Card.Meta>Projects</Card.Meta>
                                    <Card.Description>List of Projects Under Development</Card.Description>
                                    <List divided relaxed>
                                        {this.renderProjects()}
                                    </List>
                                </Card.Content>
                            </Card>
                            <Card style={cardStyle}>
                                <Card.Content>
                                    <Card.Header><Header as='h1'>All Users</Header></Card.Header>
                                    <Card.Meta>Users that are affiliated to you and the projects you have created.</Card.Meta>
                                    <Card.Description>List of Users</Card.Description>
                                    <List divided relaxed>
                                        {this.renderAllUsers()}
                                    </List>
                                </Card.Content>
                            </Card>
                        </Grid.Row>
                    </Grid>
                </Sidebar.Pushable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.dashboard.user,
        projects: state.dashboard.projects,
        allUsers: state.dashboard.allUsers,
        allIssues: state.dashboard.issues
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
