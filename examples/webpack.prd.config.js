// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tongjiCode = `
<script type="text/javascript">var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?7a4bab4637ad635825376455ce22920c";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
</script>`;

module.exports = {
  devtool: 'source-map',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    const entry = path.join(fullDir, 'app.js');
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = [entry];
    }

    return entries;
  }, {}),

  output: {
    path: path.join(__dirname, '../docs/.vuepress/dist/demo/__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/',
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.vue$/, use: ['vue-loader'] },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader'],
      },
      { test: /\.tsx?$/, exclude: /node_modules/, use: ['ts-loader'] },
    ],
  },

  resolve: {
    alias: {
      'vue.access.control': path.resolve(__dirname, '../src/index.ts'),
    },
    extensions: ['.js', '.ts', '.d.ts', '.tsx', '.vue', '.css'],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'shared',
          filename: 'shared.js',
          chunks: 'initial',
        },
      },
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: '../base/index.html',
      template: 'examples/base/index.html',
      inject: false,
      baiduTonji: tongjiCode,
    }),
    new HtmlWebpackPlugin({
      filename: '../route-middleware/index.html',
      template: 'examples/route-middleware/index.html',
      inject: false,
      baiduTonji: tongjiCode,
    }),
  ],
};
