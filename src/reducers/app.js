const CONTROL_SIDER_COLLAPSED = 'CONTROL_SIDER_COLLAPSED';

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

export const controlSiderCollapsed = (collapsed) => {
  return { type: CONTROL_SIDER_COLLAPSED, collapsed };
};
