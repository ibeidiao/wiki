const routeRules = {
  rules: {
    '-1': {
      paths: [],
      redirectPath: '/login',
    },
    '0': {
      paths: [
        '/main',
      ],
      redirectPath: '/',
    },
  },
  check(type, path) {
    const that = this;
    let isAuth = false;

    const { paths, redirectPath } = that.rules[type];
    for (let i = 0; i < paths.length; i++) {
      if (path === paths[i]) { // todo 考虑用正则匹配
        isAuth = true;
        break;
      }
    }

    return { isAuth, redirectPath };
  },
};

export default routeRules;
