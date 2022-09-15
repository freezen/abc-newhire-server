import { Controller } from 'egg';

export default class FavoriteController extends Controller {
  public async like() {
    const { ctx } = this;
    const { request } = ctx;
    const { id, videoId, like } = request.body;
    if (like === true) {
      await ctx.service.favorite.like(Number(id ?? -1), Number(videoId ?? -1));

    } else {
      await ctx.service.favorite.unlike(Number(id ?? -1), Number(videoId ?? -1));
    }
    ctx.body = {};
  }
}
