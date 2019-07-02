const path = require('path');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const typescript = require('rollup-plugin-typescript2');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const includePaths = require('rollup-plugin-includepaths');

const version = process.env.VERSION || require('../package.json').version;
const banner = `/**
 * vue.access.control v${version}
 * (c) ${new Date().getFullYear()} Lluis Liu
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
  umdProd: {
    input: resolve("src/index.ts"),
    file: resolve("dist/index.umd.min.js"),
    format: "umd",
    env: "production",
  },
  commonjs: {
    input: resolve("src/index.ts"),
    file: resolve("dist/index.common.js"),
    format: "cjs",
  },
  esm: {
    input: resolve("src/index.ts"),
    file: resolve("dist/index.esm.js"),
    format: "es",
  },
  "esm-browser-dev": {
    input: resolve("src/index.ts"),
    file: resolve("dist/index.esm.browser.js"),
    format: "es",
    env: "development",
    transpile: false,
  },
  "esm-browser-prod": {
    input: resolve("src/index.ts"),
    file: resolve("dist/index.esm.browser.min.js"),
    format: "es",
    env: "production",
    transpile: false,
  }
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
      external: ['vue', 'vue-router'],
      input: opts.input,
      treeshake: true,
      plugins: [
        //includePaths(includePathOptions),
        nodeResolve({
          extensions: ['.ts', '.js', '.json'],
        }),
        typescript({
          inlineSourceMap: false,
          tsconfig: __dirname + '/../tsconfig.json',
          typescript: require('typescript'),
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions : {
              module: "es2015"
            }
          },
        }),
        commonjs({extensions: ['.js', '.ts']}),
        replace({
          __VERSION__: version,
        }),
      ],
    },
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: 'VueAccessControl',
      sourcemap: true,
      exports: 'named',
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
      },
      external: ['Vue', 'vue-router']
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

module.exports = mapValues(configs, genConfig);
