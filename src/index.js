import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

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

import router from './route/router';
// 给增强后的store传入reducer
const store = finalCreateStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}>
      <div>
        {router}
      </div>
    </ConnectedRouter> */}
    <Routers history={history} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
