import * as fetch from '../utils/fetch';

const PAGE_SIZE = 10;
const PAGE_NUM = 1;

const ProjectService = {
  getProjectList({
    ownerId = '', filter = '', userId = 10034, pageNum = PAGE_NUM, pageSize = PAGE_SIZE,
  }) {
    return fetch.post(
      '/project/getProjectList',
      {
        filter, ownerId, userId, pageNum, pageSize,
      },
    );
  },
  createProject(params) {
    return fetch.post('/project/addProject', params);
  },
};

export default ProjectService;
