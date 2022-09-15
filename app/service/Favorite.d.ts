import { Service } from 'egg';
/**
 * Favorite Service
 */
export default class Favorite extends Service {
    like(id: number, videoId: number): Promise<any>;
    unlike(id: number, videoId: number): Promise<any>;
    checkAuth(key: string, body: Record<string, unknown>): Promise<boolean>;
}
