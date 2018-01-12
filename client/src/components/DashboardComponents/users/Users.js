import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Header, Button, Table, Card } from 'semantic-ui-react';
import SidebarMenu from '../Menu';
import * as actions from '../../../actions/user';
import CreateUserModal from '../modals/CreateUserModal';
import { Link } from 'react-router-dom';

class Users extends Component {
    componentWillMount() {
        this.props.getAffiliatedUsers();
    }

    renderUsersTable() {
        if (!this.props.users) {
            return <div>Loading...</div>
        }

        if (this.props.users.length === 0) {
            return <div>No Users found</div>
        }

        return this.props.users.map((user) => {
            return (
                <Table.Row>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.createdBy}</Table.Cell>
                    <Table.Cell>{user._id}</Table.Cell>
                </Table.Row>
            )
        })
    }

    renderUsersCards(){
        if (!this.props.users) {
            return <div>Loading...</div>
        }

        if (this.props.users.length === 0) {
            return <div>No users found</div>
        }
        
        return this.props.users.map((user) => {
            return (
                <Card key={user._id}>
                    <Card.Content>
                        <Card.Header>
                            {user.firstName} {user.lastName}
                        </Card.Header>
                        <Card.Meta>
                            Created By { user.createdBy }
                        </Card.Meta>
                        <Card.Description>
                            {user._id}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui three buttons'>
                            <Link to={`singleProject/${user._id}`}>
                                <Button>View</Button>
                            </Link>
                                <CreateUserModal editMode={true} initialValues={user} form={user._id}/>
                            <Button>Delete</Button>
                        </div>
                    </Card.Content>
                </Card>
            )
        })
    }

    render() {
        return (
            <div>
                <SidebarMenu />
                <Grid style={{ marginLeft: '7em', marginTop: '1em' }}>
                    <Grid.Row>
                        <Header as="h1">Users</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Card.Group>
                            {this.renderUsersCards()}
                        </Card.Group>
                    </Grid.Row>
                    <Grid.Row>
                        <Table style={{ width: '70%' }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>First Name</Table.HeaderCell>
                                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                                    <Table.HeaderCell>Created By (User ID)</Table.HeaderCell>
                                    <Table.HeaderCell>User ID</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.renderUsersTable()}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell colSpan='4'>
                                        <div style={{ float: 'right' }}>
                                            <CreateUserModal />
                                        </div>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.dashboard.affiliated
    }
}

export default connect(mapStateToProps, actions)(Users);