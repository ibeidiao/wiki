import {
  CONTROL_SIDER_COLLAPSED,
  GET_LOGINED_USER_INFO,
  LOGOUT,
} from '@/constants'; // 引入action类型常量名

import UserService from '@services/user.service';

export const controlSiderCollapsed = (collapsed) => {
  return { type: CONTROL_SIDER_COLLAPSED, collapsed };
};

export const getLoginUserInfo = id => (dispatch) => {
  UserService.getInfo({ id })
    .then(({ meta, data }) => {
      if (meta.errorNo === 0) {
        dispatch({
          type: GET_LOGINED_USER_INFO,
          loginedUser: data,
        });
      }
    })
    .catch((err) => {
      console.log('fetch error', err);
    });
};

export const logout = () => {
  return { type: LOGOUT, loginedUser: { nickName: 'User' } };
};
