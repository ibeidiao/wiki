import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './pages/App/App';
import Login from './pages/Login/Login';

import finalCreateStore from './store/configureStore';
import reducer from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

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
    <Router>
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
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
