module.exports = () => {
  return async function restAuth(ctx, next) {
    try {
      const { service, request } = ctx;
      const { method, url, body, header } = request;
      const { key } = header;
      const selectedMethods = [ 'POST', 'PUT', 'DELETE' ];
      const selectedPath = url.match(/([a-zA-Z]+)\/(upload|like)/);
      console.log('selectedMethods:', selectedMethods, 'key:', key, 'selectedPath:', selectedPath, 'url:', url);
      if (selectedMethods.indexOf(method) > -1 && selectedPath && selectedPath.length > 0) {
        const matchModel = selectedPath[1];
        // if there is a checkAuth func , which means this serice support auth, then do the auth check
        if (matchModel && service[matchModel] && service[matchModel].checkAuth) {
          const isAuthed = await service[matchModel].checkAuth(key, body);
          if (!isAuthed) {
            console.warn('No REST auth');
            throw {
              status: 403,
              message: 'No REST auth',
            };
          }
        }
      }
      await next();
    } catch (e) {
      ctx.setResult = e;
    }
  };
};
