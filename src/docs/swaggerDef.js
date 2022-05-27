const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'auto-attendance-tracker API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/Sneha-511/auto-attendance-tracker/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url:
        config.env === 'development'
          ? `http://localhost:${config.port}/v1`
          : `https://auto-attendance-tracker-api.herokuapp.com/v1`,
    },
  ],
};

module.exports = swaggerDef;
