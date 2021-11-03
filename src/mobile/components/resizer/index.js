/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import config from './config';
import embedly from './services/embedly'
import gemini from './services/gemini'

const SERVICES = {
  EMBEDLY: embedly,
  GEMINI: gemini
};

const service = () => SERVICES[config.proxy];

export default {
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
