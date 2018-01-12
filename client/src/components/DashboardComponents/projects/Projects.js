import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Header, Button, Table, Card } from 'semantic-ui-react';
import SidebarMenu from '../Menu';
import * as dashboardActions from '../../../actions/dashboard';
import * as projectActions from '../../../actions/project';
import ProjectModal from '../modals/ProjectModal';
import { Link } from 'react-router-dom';

class Projects extends Component {
    componentWillMount() {
        this.props.dashboardActions.fetchProjects();
    }

    deleteProject(projectId){
        this.props.projectActions.deleteProject(projectId);
    }

    editProject(project){
        console.log(project);
    }

    renderProjectsTable() {
        if (!this.props.projects) {
            return <div>Loading...</div>
        }

        if (this.props.projects.length === 0) {
            return <div>No projects found</div>
        }

        return this.props.projects.map((project) => {
            const date = new Date(project.created);

            return (
                <Table.Row>
                    <Table.Cell>{project.title}</Table.Cell>
                    <Table.Cell>{project.type}</Table.Cell>
                    <Table.Cell>{project.abbreviation}</Table.Cell>
                    <Table.Cell>{project.owner}</Table.Cell>
                    <Table.Cell>{date.getMonth() + 1}/{date.getDay()}/{date.getFullYear()}</Table.Cell>
                </Table.Row>
            )
        })
    }

    renderProjectsCards(){
        if (!this.props.projects) {
            return <div>Loading...</div>
        }

        if (this.props.projects.length === 0) {
            return <div>No projects found</div>
        }
        
        return this.props.projects.map((project) => {
            return (
                <Card key={project._id}>
                    <Card.Content>
                        <Card.Header>
                            {project.title}
                        </Card.Header>
                        <Card.Meta>
                            {project.type} Project
                        </Card.Meta>
                        <Card.Description>
                            {project.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui three buttons'>
                            <Link to={`singleProject/${project._id}`}>
                                <Button>View</Button>
                            </Link>
                                <ProjectModal editMode={true} initialValues={project} form={project._id}/>
                            <Button onClick={() => this.deleteProject(project._id)}>Delete</Button>
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
                        <Header as="h1">Projects</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Card.Group>
                            {this.renderProjectsCards()}
                        </Card.Group>
                    </Grid.Row>
                    <Grid.Row>
                        <Table style={{ width: '70%' }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                    <Table.HeaderCell>Abbreviation</Table.HeaderCell>
                                    <Table.HeaderCell>Owner</Table.HeaderCell>
                                    <Table.HeaderCell>Created</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.renderProjectsTable()}
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell colSpan='4'>
                                        <div style={{ float: 'right' }}>
                                            <ProjectModal />
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
        projects: state.dashboard.projects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch),
        projectActions: bindActionCreators(projectActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);