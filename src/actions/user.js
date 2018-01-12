import { message } from 'antd';

import {
  ADDLOGINCOUNT,
  GET_USER_LIST,
  SET_USER_STATUS,
  RESET_USER_PASSWORD,
} from '@/constants'; // 引入action类型常量名

import UserService from '@services/user.service';

export const addLoginCount = (count) => {
  return {
    type: ADDLOGINCOUNT,
    count,
  };
};

export const getUserList = (filter, pageNum) => (dispatch) => {

};

export const setUserStatus = (id, status) => (dispatch, getState) => {
  const { user: userState } = getState();
  console.log(userState);
  dispatch({ type: SET_USER_STATUS, loading: true });
  UserService.setStatus({ id, status })
    .then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success(meta.errorInfo);
      } else {
        message.error(meta.errorInfo);
      }
      dispatch({ type: SET_USER_STATUS, loading: false });
    })
    .catch((err) => {
      console.log('fetch error', err);
    });
};

export const resetUserPassword = id => (dispatch) => {
  dispatch({ type: RESET_USER_PASSWORD, loading: true });
  UserService.resetPwd({ id })
    .then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success(meta.errorInfo);
      } else {
        message.error(meta.errorInfo);
      }
      dispatch({ type: RESET_USER_PASSWORD, loading: false });
    })
    .catch((err) => {
      console.log('fetch error', err);
    });
};
