// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportFavorite from '../../../app/service/Favorite';
import ExportUsers from '../../../app/service/Users';
import ExportVideo from '../../../app/service/Video';

declare module 'egg' {
  interface IService {
    favorite: AutoInstanceType<typeof ExportFavorite>;
    users: AutoInstanceType<typeof ExportUsers>;
    video: AutoInstanceType<typeof ExportVideo>;
  }
}
