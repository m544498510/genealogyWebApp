const router = require('koa-router')();
const testRouter = require('./modules/testController');

router.use('/users', testRouter.routes(), testRouter.allowedMethods());

module.exports = router;
