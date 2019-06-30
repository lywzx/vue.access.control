const path = require('path');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const typescript = require('rollup-plugin-typescript');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const includePaths = require('rollup-plugin-includepaths');

const version = process.env.VERSION || require('../package.json').version;
const banner = `/**
 * vue.access.control v${version}
 * (c) ${new Date().getFullYear()} Evan You
 * @license MIT
 */`;

const resolve = _path => path.resolve(__dirname, '../', _path);

const configs = {
  umdDev: {
    input: resolve('src/index.ts'),
    file: resolve('dist/index.umd.js'),
    format: 'umd',
    env: 'development',
  },
  // umdProd: {
  //   input: resolve("src/index.ts"),
  //   file: resolve("dist/index.umd.min.js"),
  //   format: "umd",
  //   env: "production",
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true,
  //       extensions: [ '.ts', '.js', '.json' ]
  //     }),
  //     typescript()
  //   ]
  // },
  // commonjs: {
  //   input: resolve("src/index.ts"),
  //   file: resolve("dist/index.common.js"),
  //   format: "cjs",
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true,
  //       extensions: [ '.ts', '.js', '.json' ]
  //     }),
  //     typescript()
  //   ]
  // },
  // esm: {
  //   input: resolve("src/index.ts"),
  //   file: resolve("dist/vuex.esm.js"),
  //   format: "es",
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true,
  //       extensions: [ '.ts', '.js', '.json' ]
  //     }),
  //     typescript()
  //   ]
  // },
  // "esm-browser-dev": {
  //   input: resolve("src/index.ts"),
  //   file: resolve("dist/vuex.esm.browser.js"),
  //   format: "es",
  //   env: "development",
  //   transpile: false,
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true,
  //       extensions: [ '.ts', '.js', '.json' ]
  //     }),
  //     typescript()
  //   ]
  // },
  // "esm-browser-prod": {
  //   input: resolve("src/index.ts"),
  //   file: resolve("dist/vuex.esm.browser.min.js"),
  //   format: "es",
  //   env: "production",
  //   transpile: false,
  //   plugins: [
  //     nodeResolve({
  //       jsnext: true,
  //       extensions: [ '.ts', '.js', '.json' ]
  //     }),
  //     typescript()
  //   ]
  // }
};

function genConfig(opts) {
  let includePathOptions = {
    include: {
      vue: 'node_modules/vue/dist/vue.common.js',
      'vue-router': 'node_modules/vue-router/dist/vue-router.js',
    },
    external: ['vue', 'vue-router'],
  };
  const config = {
    input: {
      input: opts.input,
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
      },
      plugins: [
        includePaths(includePathOptions),
        nodeResolve({
          extensions: ['.ts', '.js', '.json'],
        }),
        typescript(),
        commonjs(),
        replace({
          __VERSION__: version,
        }),
      ],
    },
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: 'vue.access.control',
    },
  };

  if (opts.env) {
    config.input.plugins.unshift(
      replace({
        'process.env.NODE_ENV': JSON.stringify(opts.env),
      })
    );
  }

  if (opts.transpile !== false) {
    config.input.plugins.push(buble());
  }

  return config;
}

function mapValues(obj, fn) {
  const res = {};
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key);
  });
  return res;
}
console.log(mapValues(configs, genConfig));
module.exports = mapValues(configs, genConfig);
