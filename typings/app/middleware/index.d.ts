// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApiCatchError from '../../../app/middleware/apiCatchError';
import ExportRestAuth from '../../../app/middleware/restAuth';
import ExportTokenAuth from '../../../app/middleware/tokenAuth';

declare module 'egg' {
  interface IMiddleware {
    apiCatchError: typeof ExportApiCatchError;
    restAuth: typeof ExportRestAuth;
    tokenAuth: typeof ExportTokenAuth;
  }
}
