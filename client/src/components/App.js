import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import Header from './Header';
import Landing from './Landing';
import Home from './Home';

const App = () => {
    return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/landing" component={Landing} />
                </div>
            </BrowserRouter>
    )
}

export default App;