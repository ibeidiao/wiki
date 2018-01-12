import { Base64 } from 'js-base64';

import cookie from './cookie';

const analysis = (() => {
  const getUserId = () => {
    const user = JSON.parse(Base64.decode(cookie.get('token')));
    return user.userId;
  };

  const getUserRole = () => {
    const user = JSON.parse(Base64.decode(cookie.get('token')));
    return user.role;
  };

  const getToken = () => {
    const user = JSON.parse(Base64.decode(cookie.get('token')));
    return user.token;
  };

  return {
    getUserId,
    getUserRole,
    getToken,
  };
})();

export default analysis;
