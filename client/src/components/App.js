import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import requireAuth from './Auth/requireAuth';

import 'semantic-ui-css/semantic.min.css';

import Landing from './Landing';
import Login from './Login';
import Home from './Home';

const App = () => {
    return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signIn" component={Login} />
                    <Route exact path="/landing" component={requireAuth(Landing)} />
                </div>
            </BrowserRouter>
    )
}

export default App;