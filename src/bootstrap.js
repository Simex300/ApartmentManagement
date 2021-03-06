import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(compose((window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)));

// import 'bootstrap/dist/css/bootstrap.css';
import './style/main.scss';

import history from './history';
import Layout from './components/layout';

import requireAuth from './components/requireAuth';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Dashboard from './components/dashboard';
import NewNewsletter from './components/newsletter/newNewsletter';
import EditNewsletter from './components/newsletter/editNewsletter';
import NewsletterDetails from './components/newsletter/newsletterDetail';

import NewRequest from './components/requests/NewRequest';

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={history}>
        <Switch>
          <Layout>
            <Route path="/" exact component={Signin} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />

            <Route path="/dashboard" component={requireAuth(Dashboard)} />

            <Route path="/newsletter/new" component={requireAuth(NewNewsletter)} />
            <Route path="/newsletter/edit/:id" component={requireAuth(EditNewsletter)} />
            <Route path="/newsletter/detail/:id" component={requireAuth(NewsletterDetails)} />

            <Route path="/request/new/" component={requireAuth(NewRequest)} />
          </Layout>
        </Switch>
      </Router>
    </Provider>
    , document.querySelector('.app-wrapper'));
}

document.addEventListener('DOMContentLoaded', main);
