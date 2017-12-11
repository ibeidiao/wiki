import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import App from './pages/App/App';
import Login from './pages/Login/Login';

import finalCreateStore from './store/configureStore';
import reducer from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

// 给增强后的store传入reducer
const store = finalCreateStore(reducer);

// const requireAuth = (nextState, replace) => {
//     if (!auth.isAdmin()) {
//         // Redirect to Home page if not an Admin
//         replace({ pathname: '/' })
//     }
// }
// export const AdminRoutes = () => {
//   return (
//      <Route path="/admin" component={Admin} onEnter={requireAuth} />
//   )
// }

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
