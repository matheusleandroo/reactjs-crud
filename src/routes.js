import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Edit from './pages/edit';
import New from './pages/new';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/new" component={New} />
        </Switch>
    </BrowserRouter>
)

export default Routes;