import React, { Component } from 'react';
import SidebarMenu from '../Menu';
import { Feed, Icon, Grid, Header, Container } from 'semantic-ui-react';

class UserFeed extends Component {
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
                            <Feed.Event>
                                <Feed.Label>
                                    <img src='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' />
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.User>Elliot Fu</Feed.User> added you as a friend
                          <Feed.Date>1 Hour Ago</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Meta>
                                        <Feed.Like>
                                            <Icon name='like' />
                                            4 Likes
                          </Feed.Like>
                                    </Feed.Meta>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' />
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a>Helen Troy</a> added <a>2 new illustrations</a>
                                        <Feed.Date>4 days ago</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra images>
                                        <a><img src='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' /></a>
                                        <a><img src='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' /></a>
                                    </Feed.Extra>
                                    <Feed.Meta>
                                        <Feed.Like>
                                            <Icon name='like' />
                                            1 Like
                          </Feed.Like>
                                    </Feed.Meta>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' />
                                <Feed.Content>
                                    <Feed.Summary date='2 Days Ago' user='Jenny Hess' content='add you as a friend' />
                                    <Feed.Meta>
                                        <Feed.Like>
                                            <Icon name='like' />
                                            8 Likes
                          </Feed.Like>
                                    </Feed.Meta>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' />
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a>Joe Henderson</a> posted on his page
                          <Feed.Date>3 days ago</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra text>
                                        Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all
                          over again. Even if we don't run extra laps that day, we surely will come back for more of the same another
                          day soon.
                        </Feed.Extra>
                                    <Feed.Meta>
                                        <Feed.Like>
                                            <Icon name='like' />
                                            5 Likes
                          </Feed.Like>
                                    </Feed.Meta>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' />
                                <Feed.Content>
                                    <Feed.Summary>
                                        <a>Justen Kitsune</a> added <a>2 new photos</a> of you
                          <Feed.Date>4 days ago</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra images>
                                        <a><img src='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' /></a>
                                        <a><img src='https://wths.hope.edu/wp-content/uploads/2017/04/profile-placeholder.png' /></a>
                                    </Feed.Extra>
                                    <Feed.Meta>
                                        <Feed.Like>
                                            <Icon name='like' />
                                            41 Likes
                          </Feed.Like>
                                    </Feed.Meta>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Grid.Row>
                    </Container>
                </Grid>
            </div>
        )
    }
}

export default UserFeed;