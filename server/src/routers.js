const router = require('koa-router')();
const testRouter = require('./modules/test');

router.use('/user', testRouter.routes(), testRouter.allowedMethods());

module.exports = router;
