const utils = {
  isMac() {
    const userPlatform = navigator.platform;
    if (userPlatform.indexOf('Mac') !== -1) return true;
    return false;
  },
};

export default utils;
