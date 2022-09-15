import { Service } from 'egg';
/**
 * Video Service
 */
export default class Video extends Service {
    /**
     * getVideoList
     */
    getVideoById(id: number): Promise<any>;
    delVideoById(id: number): Promise<any>;
    getVideoList(pageNo: number, userid: number, platform?: string, size?: number, sort?: boolean): Promise<any>;
    insert(uploaderId: number, name: string, filehash: string, pic: string): Promise<any>;
    update(filehash: string, url: string): Promise<any>;
    checkAuth(key: string, body: Record<string, unknown>): Promise<boolean>;
}
