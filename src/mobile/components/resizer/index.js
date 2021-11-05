/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { config } = require('./config');
const { embedly } = require('./services/embedly')
const { gemini } = require('./services/gemini')

const SERVICES = {
  EMBEDLY: embedly,
  GEMINI: gemini
};

const service = () => SERVICES[config.proxy];

export const resizer = {
  resize() {
    return service().resize(...arguments);
  },
  crop() {
    return service().crop(...arguments);
  },
  fill() {
    return service().fill(...arguments);
  }
};
