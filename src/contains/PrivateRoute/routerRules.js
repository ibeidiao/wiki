const routeRules = {
  routers: [
    {
      path: '/login',
      unLogin: 1,
    },
    {
      path: '/',
      unLogin: 1,
    },
    {
      path: '/users',
      auth: 2,
    },
    {
      path: '/users',
      auth: 2,
    },
    {
      path: '/projects',
      auth: 1, // auth：1为管理员权限
    },
  ],
  check(path, isLogin, auth) {
    if (path === undefined || isLogin === undefined) {
      throw ('参数不完整');
    }

    const that = this;
    const { routers } = that;

    let router = '';
    let redirectPath = '';

    for (let i = 0; i < routers.length; i++) {
      if (path === routers[i].path) { // todo 考虑用正则匹配
        router = routers[i];
        break;
      }
    }

    if (router) {
      if (!router.unLogin && !isLogin) { // 未登录
        redirectPath = '/login';
      } else if (!router.unLogin && !(router.auth === auth)) { // 已登录但没有权限访问的路由
        redirectPath = null;
      }
    } else { // 匹配不到路由返回404页面
      redirectPath = '/error';
    }

    return redirectPath;
  },
};

export default routeRules;
