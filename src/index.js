import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import App from './pages/App/App';
import Login from './pages/Login/Login';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <Route
        exact
        path="/"
        render={() => {
          <Redirect to={{
            pathname: "/main"
          }}/>
        }}
      />
      <Route path="/main" component={App} />
      <Route path="/login" component={Login} />
    </div>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
