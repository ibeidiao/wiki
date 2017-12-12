import { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA } from '../constants'; // 引入action类型常量名

// 初始化state数据
const initialState = {
  number: 1,
  lists: [
    { text: '整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。' },
    { text: '惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。' },
    { text: '为了描述 action 如何改变 state tree ，你需要编写 reducers。' },
    { text: '就是这样，现在你应该明白 Redux 是怎么回事了。' },
  ],
  data: [],
};

// 通过dispatch action进入
export default function department(state = initialState, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case INCREASE:
      return Object.assign({}, state, { number: state.number + action.amount });
    case DECREASE:
      return Object.assign({}, state, { number: state.number - action.amount });
    case GETSUCCESS:
      return Object.assign({}, state, { lists: action.json });
    case REFRESHDATA:
      return Object.assign({}, state, { data: [] });
    default:
      return state;
  }
}
