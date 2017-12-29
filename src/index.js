import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

import Routers from '@/Routers';

import finalCreateStore from '@store/configureStore';
import reducer from '@reducers/index';
import registerServiceWorker from '@/registerServiceWorker';

import history from '@/history';

import '@/index.less';

import router from '@route/router';
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
