import { CONTROL_SIDER_COLLAPSED } from '../constants'; // 引入action类型常量名

export const controlSiderCollapsed = (collapsed) => {
  return { type: CONTROL_SIDER_COLLAPSED, collapsed };
};
