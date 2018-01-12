import {
  CONTROL_SIDER_COLLAPSED,
  GET_LOGINED_USER_INFO,
  LOGOUT,
} from '@/constants'; // 引入action类型常量名

const defaultState = {
  collapsed: true,
  loginedUser: {
    nickName: 'User',
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONTROL_SIDER_COLLAPSED:
      return { ...state, collapsed: action.collapsed };
    case GET_LOGINED_USER_INFO:
      return { ...state, loginedUser: action.loginedUser };
    case LOGOUT:
      return { ...state, loginedUser: action.loginedUser };
    default:
      return state;
  }
};
