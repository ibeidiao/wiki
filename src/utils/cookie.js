const cookieUtils = {
  set(name, value, _options) {
    const that = this;

    const options = _options || {};
    let str = `${that.encode(name)}=${that.encode(value)}`;

    if (value == null) options.maxage = -1;

    if (options.maxage) {
      options.expires = new Date(+new Date() + options.maxage);
    }
    str += '; path=/';
    if (options.domain) str += `; domain= ${options.domain}`;
    if (options.expires) str += `; expires=${options.expires.toUTCString()}`;
    if (options.secure) str += '; secure';

    document.cookie = str;

    return true;
  },
  get(name) {
    const that = this;

    return that.all()[name];
  },
  del(name) {
    const that = this;

    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = that.get(name);

    if (cval) {
      document.cookie = `${that.encode(name)}=${cval}; expires=${exp.toUTCString()}; path=/`;
      return true;
    }
    return false;
  },
  all() {
    const that = this;

    let str = '';
    try {
      str = document.cookie;
    } catch (err) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(err.stack || err);
      }
      return {};
    }
    return that.parse(str);
  },
  parse(str) {
    const that = this;

    const obj = {};
    const pairs = str.split(/ *; */);
    let pair = [];
    if (pairs[0] === '') return obj;
    for (let i = 0; i < pairs.length; ++i) {
      pair = pairs[i].split('=');
      obj[that.decode(pair[0])] = that.decode(pair[1]);
    }
    return obj;
  },
  encode(value) {
    try {
      return encodeURIComponent(value);
    } catch (e) {
      throw ('error `encode(%o)` - %o', value, e);
    }
  },
  decode(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      throw ('error `decode(%o)` - %o', value, e);
    }
  }
};

export default cookieUtils;
