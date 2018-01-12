import {
  GET_USER_LIST,
  SET_USER_STATUS,
  RESET_USER_PASSWORD,
} from '@/constants'; // 引入action类型常量名

// 初始化state数据
const defaultState = {
  filter: '',
  userList: [],
  pagination: {},
  loading: false,
};

// 通过dispatch action进入
export default (state = defaultState, action) => {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case SET_USER_STATUS:
      return { ...state, loading: action.loading };
    case RESET_USER_PASSWORD:
      return { ...state, loading: action.loading };
    case GET_USER_LIST:
      return { ...state };
    default:
      return state;
  }
};
