/* eslint-disable no-plusplus */
const http = require('http');

const port = process.env.PORT || 7070;
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const Router = require('koa-router');
const slow = require('koa-slow');
const faker = require('faker');

const app = new Koa();
const server = http.createServer(app.callback());
const router = new Router();

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET'],
  }),
);

app.use(koaBody({
  json: true,
  text: true,
  urlencoded: true,
}));

app.use(slow({
  delay: 7000,
}));

app.use(router.routes()).use(router.allowedMethods());

router.get('/posts', async (ctx) => {
  const posts = [];

  for (let i = 0; i < 4; i++) {
    const post = {
      id: faker.datatype.uuid(),
      image: faker.image.avatar(),
      title: faker.lorem.words(),
      description: faker.lorem.sentences(),
    };
    posts.push(post);
  }

  ctx.response.body = posts;
});

server.listen(port, () => console.log('Server started'));
