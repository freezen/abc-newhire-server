import { Controller } from 'egg';
export default class FavoriteController extends Controller {
    like(): Promise<void>;
}
