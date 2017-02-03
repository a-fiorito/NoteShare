const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
}

//json parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// initialize db tables
const initialize = require('./db/initialize');
initialize(false);

// public folder
app.use('/', express.static(__dirname + '/../dist'));

// express routes
app.use('/authenticate', require('./routes/authenticate.route'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port);