import { app } from 'egg-mock/bootstrap';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('assert');
let token = '';
describe('test/app/controller/admin.test.ts', () => {
  it('should login /', async () => {
    const result = await app.httpRequest().post('/login').send({
      name: 'Sam',
      pwd: 'Admin!',
    })
      .expect(200);
    token = (result as any)?.body?.token ?? '';
    assert((result as any).body.success === true);
  });
  it('should GET /admin', async () => {
    const result = await app.httpRequest().get('/').set('token', token)
      .set('key', 'Sam')
      .send()
      .expect(200);
    assert((result as any).body.length > 0);
  });
});
