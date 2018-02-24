const Router = require('koa-router');
const router = new Router();

router.get('/getUser',  (ctx, next) => {
  ctx.body = {
    name: 'name',
    age: 12,
    sex: 'male'
  };
});
router.get('/2', (ctx, next) => {
  ctx.body = '111';
});

router.get('/getUserList',  (ctx, next) => {
  ctx.body = [
    {
      name: 'name',
      age: 12,
      sex: 'male'
    },
    {
      name: 'name',
      age: 12,
      sex: 'male'
    }, {
      name: 'name',
      age: 12,
      sex: 'male'
    }, {
      name: 'name',
      age: 12,
      sex: 'male'
    }];
});

module.exports = router;
