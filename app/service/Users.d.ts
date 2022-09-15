import { Service } from 'egg';
export declare enum EAuth {
    ADMIN = "admin",
    READ = "read"
}
/**
 * Users Service
 */
export default class Users extends Service {
    /**
     * getUser
     * @param name - your name
     */
    getUserList(): Promise<any>;
    getUserAuthInfo(key: string): Promise<any>;
    login(name: string, hashPwd: string): Promise<any>;
}
