let target = "web";

if (process.env.REACT_APP_MODE === "electron") {
  target = "electron-renderer";
}

const CracoEsbuildPlugin = require("craco-esbuild");

console.log(`craco.config.js: setting webpack target to: ${target}`);

module.exports = {
  plugins: [{ plugin: CracoEsbuildPlugin }],
  webpack: {
    configure: {
      target: target,
    },
  },
};
