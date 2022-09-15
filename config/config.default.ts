import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661778327203_6866';

  config.cors = {
    origin: '*', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your egg config in here
  config.middleware = [ 'tokenAuth', 'restAuth', 'apiCatchError' ];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  // 配置上传
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: [ '.mp4', '.flv', '.png', '.jpeg', '.jpg', '.webp' ], // 扩展几种上传的文件格式
  };

  config.bodyParser = {
    formLimit: '10mb',
    jsonLimit: '10mb',
    textLimit: '10mb',
    enableTypes: [ 'json', 'form', 'text' ],
    extendTypes: {
      text: [ 'text/plain', 'application/json', 'text/json' ],
    },
  };

  config.mysql = {
    client: {
      host: 'ls-a8941fa414be8deed9d7759b519ae25d89458241.c6ceupbbd4na.us-west-2.rds.amazonaws.com',
      port: '3306',
      user: 'prod',
      password: 'Prodenv!',
      database: 'dbnewhire',
    },
  };

  // config.mysql = {
  //   client: {
  //     host: 'localhost',
  //     port: '3307',
  //     user: 'prod',
  //     password: 'Prodenv!',
  //     database: 'newhire',
  //   },
  // };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
