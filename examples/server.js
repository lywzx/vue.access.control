// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackDevMiddleware = require('webpack-dev-middleware');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackHotMiddleware = require('webpack-hot-middleware');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebpackConfig = require('./webpack.dev.config');

const app = express();
const compiler = webpack(WebpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false,
    },
  })
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

const port = process.env.PORT || 8009;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
