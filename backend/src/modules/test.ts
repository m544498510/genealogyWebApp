import Router from 'koa-router';
const router = new Router();

router.get('/getUser', ctx => {
  ctx.body = {
    "name": "name",
    "age": 13,
    "sex": "male"
  };
});

router.get('/getUserList', ctx => {
  ctx.body = [
    {
      "name": "name",
      "age": 12,
      "sex": "male"
    }, {
      "name": "name",
      "age": 12,
      "sex": "male"
    }, {
      "name": "name",
      "age": 12,
      "sex": "male"
    }, {
      "name": "name",
      "age": 12,
      "sex": "male"
    }
  ];
});

export default router;
