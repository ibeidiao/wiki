import { ADDLOGINCOUNT } from '@/constants'; // 引入action类型常量名

// 初始化state数据
const initialState = {
  loginCount: 0,
};

// 通过dispatch action进入
export default function user(state = initialState, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case ADDLOGINCOUNT:
      return Object.assign({}, state, { loginCount: state.loginCount + action.count });
    default:
      return state;
  }
}
