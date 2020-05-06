const express = require('express');
const server = express();
const morgan = require("morgan");
const helmet = require("helmet");

const userRouter = require('./users/userRouter.js');


// global middleware
server.use(express.json())
server.use(logger);
server.use(morgan("combined"));
server.use(helmet());

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}
module.exports = server;
