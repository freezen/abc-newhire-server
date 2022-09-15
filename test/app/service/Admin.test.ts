// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('assert');
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Test.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('test', async () => {
    const result = await ctx.service.users.getUserList();
    assert(result.length > 0);
  });
});
