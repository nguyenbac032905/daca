const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database/database.json'); // đường dẫn đến file db của bạn
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running');
});