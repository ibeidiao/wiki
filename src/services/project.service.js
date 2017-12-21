import * as fetch from '../utils/fetch';

const ProjectService = {
  createProject(params) {
    return fetch.post('/project/addProject', params);
  },
};

export default ProjectService;
