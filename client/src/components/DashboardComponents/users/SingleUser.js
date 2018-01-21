import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarMenu from '../Menu';
import { Grid, Header, Segment, Card, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/user';

const cardStyle = {
    height: '300px',
    margin: '10px'
}

class SingleUser extends Component {
    componentWillMount() {
        const { userId } = this.props.match.params;
        this.props.getSingleUser(userId);
        this.props.fetchUserIssues(userId);
    }

    renderUsersIssues() {
        if(this.props.usersIssues && this.props.usersIssues.length === 0){
            return <Header as='h2'>This user currently does not have any issues assigned to them.</Header>;
        }

        if (this.props.usersIssues) {
            return this.props.usersIssues.map(issue =>
                <List.Item key={issue._id}>
                    <List.Icon name='check' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>{issue.summary}</List.Header>
                        <List.Description>Created on</List.Description>
                    </List.Content>
                </List.Item>
            )
        }
    }

    renderSingleUser() {
        if (this.props.user) {
            return (
                <div>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                Full Name: {this.props.user.firstName} {this.props.user.lastName}
                            </Card.Header>
                            <Card.Meta>
                                {this.props.user.createdBy ? `Created By: ${this.props.user.createdBy}` : ''}
                            </Card.Meta>
                            <Card.Description>
                                Admin: {this.props.user.isAdmin ? 'True' : 'False'}
                            </Card.Description>
                        </Card.Content >
                        <Card style={cardStyle}>
                            <Card.Content>
                                <Card.Header><Header as='h1'>Current Issues</Header></Card.Header>
                                <Card.Meta>Users Issues that are currently in progress.</Card.Meta>
                                <Card.Description>List of Issues</Card.Description>
                                <List divided relaxed style={{ overflowY: 'scroll', height: '150px' }}>
                                    {this.renderUsersIssues()}
                                </List>
                            </Card.Content>
                        </Card>
                    </Card>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <SidebarMenu />
                <Grid columns='equal' style={{ marginLeft: '7em', marginTop: '1em' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h1'>Single User View</Header>
                            <Card.Group>
                                {this.renderSingleUser()}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.dashboard.currentUser,
        usersIssues: state.dashboard.usersIssues
    }
}

export default connect(mapStateToProps, actions)(SingleUser);