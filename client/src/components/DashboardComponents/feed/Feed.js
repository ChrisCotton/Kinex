import React, { Component } from 'react';
import SidebarMenu from '../Menu';
import { connect } from 'react-redux';
import * as actions from '../../../actions/feed';
import { Feed, Icon, Grid, Header, Container } from 'semantic-ui-react';

class UserFeed extends Component {
    componentWillMount() {
        this.props.getFeed();
    }

    renderFeed() {
        if(this.props.feed){
            return this.props.feed.map(feed =>
                <Feed.Event>
                    <Feed.Label>
                        <img src='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                            {feed.text}
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
            )
        }
    }

    render() {
        return (
            <div>
                <SidebarMenu />
                <Grid style={{ marginLeft: '7em', marginTop: '1em' }}>
                    <Container>
                        <Grid.Row>
                            <Header as="h1">User Feed</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Feed>
                                {this.renderFeed()}
                            </Feed>
                        </Grid.Row>
                    </Container>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        feed: state.dashboard.feed
    }
}

export default connect(mapStateToProps, actions)(UserFeed);