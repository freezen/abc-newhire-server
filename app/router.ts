import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // admin
  router.get('/', controller.admin.index);
  router.get('/admin', controller.admin.index);
  router.post('/login', controller.admin.login);

  // video
  router.get('/getVideoList', controller.video.index);
  router.get('/getVideo', controller.video.getVideo);
  router.post('/video/upload', controller.video.upload);
  router.post('/video/delete', controller.video.delete);
  router.post('/uploadCallback', controller.video.uploadCallback);

  // favorite
  router.post('/favorite/like', controller.favorite.like);
};
