import { checkToken } from '../util/util';

module.exports = () => {
  return async function tokenAuth(ctx, next) {
    try {
      const whiteList = [
        '/login',
        '/getVideoList',
        '/getVideo',
        '/uploadCallback',
      ];
      const { request } = ctx;
      const { header, url } = request;
      const path = url.split('?')[0];
      console.log('!whiteList.includes(path):', !whiteList.includes(path), path);
      if ((!checkToken(header.key, header.token) || !header.token) && url !== '' && path !== '/uploadCallback' && !whiteList.includes(path)) {
        console.warn('No token auth');
        ctx.body = {
          status: 401,
          message: 'No token auth',
        };
      } else {
        await next();
      }
    } catch (e) {
      ctx.body = e;
    }
  };
};
