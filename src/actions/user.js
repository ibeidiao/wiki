import { ADDLOGINCOUNT } from '../constants'; // 引入action类型常量名

export const addLoginCount = (count) => {
  return {
    type: ADDLOGINCOUNT,
    count
  };
};
