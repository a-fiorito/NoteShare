/**
 * The main nodejs which hosts the webserver and all files.
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

const app = express();

// webpack and hot reload middlewares
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
        stats: {
            historyApiFallback: true
        }
    }));
}

//json parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// public folder
app.use('/', express.static(__dirname + '/../dist'));

// express routes
app.use('/authenticate', require('./routes/authenticate.route'));
app.use('/courses', require('./routes/courses.route'));
app.use('/pdfs', require('./routes/pdf.route'));
app.use('/comments', require('./routes/comment.route'));
app.use('/stats', require('./routes/stats.route'));

// single page app, always serve one page
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


const port = process.env.PORT || 3000;
// initialize db tables
const initialize = require('./db/initialize');
initialize(false).then(() => {
    app.listen(port);
});
