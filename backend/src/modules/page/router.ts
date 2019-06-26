import {createReadStream} from 'fs';
import path from 'path';
import Router from 'koa-router';
import {apiPrefix} from "../../config";

const publicPath = path.resolve(__dirname, '../../../public');
const router = new Router();

router.get('/*', ctx => {
  const url = ctx.url;
  if (
    !url.includes(apiPrefix.api) && !url.includes('.')
    && !url.includes(apiPrefix.public) && !url.includes(apiPrefix.graphql)
  ) {
    ctx.response.type = 'html';
    ctx.response.body = createReadStream(path.resolve(publicPath, './dist/index.html'));
  }
});

export default router;
