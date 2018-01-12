import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import requireAuth from './Auth/requireAuth';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import Dashboard from './DashboardComponents/Dashboard';
import Projects from './DashboardComponents/projects/Projects';
import SingleProejct from './DashboardComponents/projects/SingleProject';
import Users from './DashboardComponents/users/Users';
import Feed from './DashboardComponents/feed/Feed';
import Login from './Login';
import Home from './Home';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" render={() => (
                        this.props.authenticated ? (<Dashboard/>) : (<Home/>)
                    )} />
                    <Route exact path="/signIn" component={Login} />
                    <Route exact path="/singleProject/:projectId" component={SingleProejct} />
                    <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
                    <Route exact path="/projects" component={requireAuth(Projects)} />
                    <Route exact path="/users" component={requireAuth(Users)} />
                    <Route exact path="/feed" component={requireAuth(Feed)} />
                </div>
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(App);