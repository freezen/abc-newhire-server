import { Controller } from 'egg';
export default class AdminController extends Controller {
    index(): Promise<void>;
    login(): Promise<void>;
}
