import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Segment, List, Card, Container, Button, Icon } from 'semantic-ui-react';
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.projectIssues) {
            this.setState({ currentIssue: nextProps.projectIssues[0] });
        }
    }

    componentWillUnmount() {
        this.setState({ currentIssue: {} });
    }

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
                    <IssueModal projectId={projectId} />
                </Card>

            </Card.Group>
        )
    }

    renderIssueScreen() {
        if (!this.state.currentIssue && this.props.projectIssues.length) {
            this.setState({ currentIssue: this.props.projectIssues[0] });
        }

        if(this.state.currentIssue){
        return (
            <Container>
                <Grid>
                    <Grid.Row style={{ marginTop: '3em' }}>
                        <Grid.Column>
                            <Header as='h1'>
                                <Icon name='pin' />
                                <Header.Content>{this.state.currentIssue.summary}</Header.Content>
                            </Header>
                            <Header as='h3' color='grey'>
                                {this.state.currentIssue.description}
                            </Header>
                            <Button>Edit</Button>
                            <Button>To Do</Button>
                            <Button>In Progress</Button>
                            <Button>Done</Button>
                            <Header as='h4' color='grey'>
                                Type: {this.state.currentIssue.issueType}
                            </Header>
                            <Header as='h4' color='grey'>
                                Priority: {this.state.currentIssue.priority}
                            </Header>
                            <Header as='h4' color='grey'>
                                Assignee: {this.state.currentIssue.assignee}
                            </Header>
                            <Header as='h4' color='grey'>
                                Reporter: {this.state.currentIssue.reporter}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
    }

    renderProjectIssues() {
        const { projectId } = this.props.match.params;

        if (!this.props.projectIssues) {
            return <div>{}</div>
        }

        if (this.props.projectIssues.length === 0) {
            return <IssueModal projectId={projectId} />
        }

        return (
            this.props.projectIssues.map((issue) => {
                return (
                    <List.Item onClick={() => this.setState({ currentIssue: issue })} key={issue._id}>
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{issue.summary}</List.Header>
                            <List.Description as='a'>{issue.description}</List.Description>
                        </List.Content>
                    </List.Item>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <SidebarMenu />
                <Grid columns='equal' style={{ marginLeft: '7em', marginTop: '1em' }}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                        {this.renderSingleProject()}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column width={3}>
                            <Segment>
                                <Header as='h2'>Open Issues</Header>
                                <List style={{ height: '75vh', overflowY: 'scroll' }} divided relaxed>
                                    {this.renderProjectIssues()}
                                </List>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                {this.renderIssueScreen()}
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