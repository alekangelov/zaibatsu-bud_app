const path = require("path");

module.exports = {
  development: {
    APP_URL: "http://localhost:3000/#/",
  },
  production: {
    APP_URL: path.join(__dirname, "./build/index.html"),
  },
};
