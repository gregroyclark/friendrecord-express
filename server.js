const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('combined'));
app.use(express.json());

app.use(
  cors({
    origin: [
      'https://friendrecord.netlify.app',
      'https://friendrecord-express.onrender.com',
      'https://friendrecord.com',
    ],
    credentials: true,
    default: 'https://friendrecord.com',
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// auth goes here
function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (token == null)
    return res.status(401).send({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ message: 'Failed to authenticate token' });
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };

// app.use(express.static(path.join(__dirname, 'frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
// });

// this does not seem to work
// app.all('*', function (req, res, next) {
//   const origin =
//     cors.origin.find(
//       (allowedOrigin) =>
//         allowedOrigin === req.header('origin').toLocaleLowerCase()
//     ) || cors.default;
//   res.header('Access-Control-Allow-Origin', origin);
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use(routes);

app.listen(port, () =>
  console.log(`🌎 ==> API Server now listening on port ${port}`)
);
