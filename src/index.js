import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';

import App from './pages/App/App';
import Login from './pages/Login/Login';

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
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />

          <App>
            <Route />
          </App>

          <Route component={Error} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
