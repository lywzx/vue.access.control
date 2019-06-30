const buble = require("rollup-plugin-buble");
const typescript = require('rollup-plugin-typescript');

module.exports = {
  input: "src/plugins/logger.js",
  output: {
    file: "dist/logger.js",
    format: "umd",
    name: "createVuexLogger"
  },
  plugins: [typescript(), buble()]
};
