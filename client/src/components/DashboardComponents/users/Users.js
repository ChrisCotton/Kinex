import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Header, Button, Table, Card, Confirm } from 'semantic-ui-react';
import SidebarMenu from '../Menu';
import * as actions from '../../../actions/user';
import CreateUserModal from '../modals/CreateUserModal';
import { Link } from 'react-router-dom';

class Users extends Component {
    state = { open: false, currentUser: {} }

    componentWillMount() {
        this.props.getAffiliatedUsers();
        this.props.fetchUser();
    }

    conditionallyRender(element) {
        if (this.props.user) {
            return (
                <div style={{ display: this.props.user.isAdmin ? 'block' : 'none' }}>
                    {element}
                </div>
            )
        }
    }

    showConfirm = (userId) => {
        this.setState({ open: true, currentUser: userId });
    }
    handleCancel = () => this.setState({ open: false });
    handleConfirm = () => {
        this.props.deleteUser(this.state.currentUser);
        this.setState({ open: false });
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

    renderUsersCards() {
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
                            Created By {user.createdBy}
                        </Card.Meta>
                        <Card.Description>
                            {user._id}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui three buttons'>
                            <Link to={`singleUser/${user._id}`}>
                                <Button>View</Button>
                            </Link>
                            {this.conditionallyRender(
                                <div>
                                    <CreateUserModal editMode={true} initialValues={user} form={user._id} />
                                    <Button onClick={() => this.showConfirm(user._id)}>Delete</Button>
                                    <Confirm
                                        open={this.state.open}
                                        content= {<Header as='h3'>Are you sure you want to delete?</Header>}
                                        cancelButton='Never mind'
                                        confirmButton={<Button style={{ backgroundColor: 'red' }}>Delete!</Button>}
                                        onCancel={this.handleCancel}
                                        onConfirm={this.handleConfirm}
                                    />                         
                                </div>
                            )}
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
                            {this.conditionallyRender(
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell colSpan='4'>
                                                <CreateUserModal />
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            )}
                        </Table>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.dashboard.affiliated,
        user: state.dashboard.user
    }
}

export default connect(mapStateToProps, actions)(Users);