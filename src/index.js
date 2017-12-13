import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './pages/App/App';
import Login from './pages/Login/Login';
import PrivateRoute from './contains/PrivateRoute/PrivateRoute';

import finalCreateStore from './store/configureStore';
import reducer from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

// 给增强后的store传入reducer
const store = finalCreateStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to={{
                pathname: '/main',
              }}
              />
            )}
          />
          <PrivateRoute path="/main" component={App} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
