import { CONTROL_SIDER_COLLAPSED } from '../constants'; // 引入action类型常量名

const defaultState = {
  collapsed: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONTROL_SIDER_COLLAPSED:
      return { ...state, collapsed: action.collapsed };
    default:
      return state;
  }
};
