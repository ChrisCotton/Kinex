import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Segment, List, Card, Container, Button, Icon, Tab } from 'semantic-ui-react';
import SidebarMenu from '../Menu';
import * as actions from '../../../actions/project';
import IssueModal from '../modals/IssueModal';

class SingleProject extends Component {
    state = { currentIssue: {} }

    componentWillMount() {
        const { projectId } = this.props.match.params;
        this.props.fetchProject(projectId);
        this.props.fetchIssues(projectId);
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.projectIssues && nextProps.projectIssues.length) {
    //         console.log(nextProps.projectIssues[nextProps.projectIssues.length - 1]);
    //         this.setState({ currentIssue: nextProps.projectIssues[nextProps.projectIssues.length - 1] });
    //     }
    // }

    renderSingleProject() {
        const { projectId } = this.props.match.params;

        if (!this.props.project) {
            return <div>Loading...</div>
        }

        return (
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header><Header as='h1'>{this.props.project.title}/{this.props.project.title}</Header></Card.Header>
                        <Card.Meta>{this.props.project.type}</Card.Meta>
                        <Card.Description>{this.props.project.description}</Card.Description>
                    </Card.Content>
                    <IssueModal editMode={false} projectId={projectId} form={projectId} />
                </Card>

            </Card.Group>
        )
    }

    renderProjectIssues() {
        const { projectId } = this.props.match.params;

        if (!this.props.projectIssues) {
            return <div>{}</div>
        }

        if (this.props.projectIssues.length === 0) {
            return <IssueModal projectId={projectId} />
        }

        const panes = this.props.projectIssues.map(issue => {
            console.log(issue);
            return {
                menuItem: issue.summary, render: () => {
                    return <Tab.Pane>
                        <Container>
                            <Grid>
                                <Grid.Row style={{ marginTop: '3em' }}>
                                    <Grid.Column>
                                        <Header as='h1'>
                                            <Icon name='pin' />
                                            <Header.Content>{issue.summary}</Header.Content>
                                        </Header>
                                        <Header as='h3' color='grey'>
                                            {issue.description}
                                        </Header>
                                        <IssueModal editMode={true} initialValues={issue} />
                                        <Button>To Do</Button>
                                        <Button>In Progress</Button>
                                        <Button>Done</Button>
                                        <Header as='h4' color='grey'>
                                            Type: {issue.issueType}
                                        </Header>
                                        <Header as='h4' color='grey'>
                                            Priority: {issue.priority}
                                        </Header>
                                        <Header as='h4' color='grey'>
                                            Assignee: {issue.assignee}
                                        </Header>
                                        <Header as='h4' color='grey'>
                                            Reporter: {issue.reporter}
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Tab.Pane>
                }
            }
        })

        return <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
    }

    render() {
        return (
            <div>
                <SidebarMenu />
                <Grid columns='equal' style={{ marginLeft: '7em', marginTop: '1em' }}>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            {this.renderSingleProject()}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Header as='h2'>Open Issues</Header>
                                {this.renderProjectIssues()}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        project: state.dashboard.project,
        projectIssues: state.dashboard.projectIssues
    }
}

export default connect(mapStateToProps, actions)(SingleProject);