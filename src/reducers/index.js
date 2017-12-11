import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // 将routerReducer一起合并管理

import app from './app';
import department from './department';
import user from './user';

export default combineReducers({
  app,
  department,
  user,
  routing: routerReducer
});
