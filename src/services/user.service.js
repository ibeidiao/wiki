import * as fetch from '@utils/fetch';

const PAGE_SIZE = 10;
const PAGE_NUM = 1;

const UserService = {
  getUserList({ filter = '', pageNum = PAGE_NUM, pageSize = PAGE_SIZE }) {
    return fetch.post('/user/getUserList', { filter, pageNum, pageSize });
  },
  resetPwd(params) {
    return fetch.post('/user/resetPwd', params);
  },
  setStatus(params) {
    return fetch.post('/user/setStatus', params);
  },
  addUser(params) {
    return fetch.post('/user/addUser', params);
  },
  checkLoginNameUnique(params) {
    return fetch.post('/user/checkLoginNameUnique', params);
  },
  getUserOptions(params) {
    return fetch.post('/user/getUserOptions', params);
  },
};

export default UserService;
