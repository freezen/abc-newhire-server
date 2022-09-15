import { Controller } from 'egg';
export default class VideoController extends Controller {
    index(): Promise<void>;
    getVideo(): Promise<void>;
    delete(): Promise<void>;
    upload(): Promise<void>;
    uploadCallback(): Promise<void>;
}
