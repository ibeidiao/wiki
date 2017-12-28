const routeRules = {
  routers: [
    {
      path: '/login',
      unLogin: 1,
    },
    {
      path: '/',
      auth: [],
    },
    {
      path: '/departments',
      auth: [],
    },
    {
      path: '/users',
      auth: [],
    },
    {
      path: '/projects',
      auth: [], // auth：1为管理员权限
    },
  ],
  check(path, isLogin, auth) {
    if (path === undefined || isLogin === undefined) {
      throw new Error('参数不完整');
    }

    const that = this;
    const { routers } = that;

    let router = '';
    let isAuth = true;
    let redirectPath = '';

    for (let i = 0; i < routers.length; i += 1) {
      if (path === routers[i].path) { // todo 考虑用正则匹配
        router = routers[i];
        break;
      }
    }

    if (router) {
      if (!router.unLogin && !isLogin) { // 未登录
        isAuth = false;
        redirectPath = '/login';
      } else if (!router.unLogin) { // 已登录但没有权限访问的路由
        isAuth = false;
        if (router.auth.length) {
          for (let i = 0; i < router.auth.length; i += 1) {
            if (auth === router.auth[i]) {
              isAuth = true;
              break;
            }
          }
        } else {
          isAuth = true;
        }
        if (!isAuth) redirectPath = null;
      }
    } else { // 匹配不到路由返回404页面
      isAuth = false;
      redirectPath = '/error';
    }

    return { isAuth, redirectPath };
  },
};

export default routeRules;
