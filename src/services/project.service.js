import * as fetch from '@utils/fetch';

const PAGE_SIZE = 10;
const PAGE_NUM = 1;

const ProjectService = {
  getProjectList({
    ownerId = '', filter = '', pageNum = PAGE_NUM, pageSize = PAGE_SIZE,
  }) {
    return fetch.post(
      '/project/getProjectList',
      {
        filter, ownerId, pageNum, pageSize,
      },
    );
  },
  createProject(params) {
    return fetch.post('/project/addProject', params);
  },
  getProjectDeatil(params) {
    return fetch.post('/project/getProjectDetail', params);
  },
  addProjectUserRelation(params) {
    return fetch.post('/project/addProjectUserRelation', params);
  },
  removeProjectUserRelation(params) {
    return fetch.post('/project/removeProjectUserRelation', params);
  },
  makeOverProject(params) {
    return fetch.post('/project/makeOverProject', params);
  },
  setStatus(params) {
    return fetch.post('/project/setStatus', params);
  },
  editProject(params) {
    return fetch.post('/project/editProject', params);
  },
  getProjectInfo(params) {
    return fetch.post('/project/getProjectInfo', params);
  }
};

export default ProjectService;
