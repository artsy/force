/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { MultiPageView } = require('./view');
import config from './config';

export default key => new MultiPageView(config[key]);
