/**
 * @type import('@lywzx/rollup-build-script/interfaces/package-option').IRollupConfig
 */
module.exports = {
  ts: true,
  dts: true,
  tsconfigOverride: {
    include: ["src"],
    exclude: ["test", "example"],
    compilerOptions: {
      "module": "ES6",
    }
  },
  globals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
  },
  external: ['Vue', 'vue-router'],
  inputPrefix: 'src',
}
