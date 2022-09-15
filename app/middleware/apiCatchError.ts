
// to catch error
module.exports = () => {
  return async function apiCatchError(ctx, next) {
    try {
      await next();
    } catch (e: any) {
      console.log(`Error catched in [apiCatchError middleware]: ${e}`);
      ctx.body = {
        status: 501,
        message: e?.message,
        stack: e?.stack,
      };
    }
  };
};
