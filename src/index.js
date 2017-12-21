import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';

import Routers from './Routers';

import App from './pages/App/App';
import Login from './pages/Login/Login';
import Users from './pages/User/User';
import PrivateRoute from './contains/PrivateRoute/PrivateRoute';

import finalCreateStore from './store/configureStore';
import reducer from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

import history from './history';

import './index.less';

// 给增强后的store传入reducer
const store = finalCreateStore(reducer);

const Error = () => {
  return (
    <div>404</div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={App}>
            <Route path="/users" component={Users} />
          </PrivateRoute>
          <Route component={Error} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
