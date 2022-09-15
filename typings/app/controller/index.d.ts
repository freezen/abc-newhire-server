// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportFavorite from '../../../app/controller/favorite';
import ExportVideo from '../../../app/controller/video';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    favorite: ExportFavorite;
    video: ExportVideo;
  }
}
