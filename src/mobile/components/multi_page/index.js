/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { MultiPageView } = require('./view');
const { config } = require('./config');

export const openMultiPage = key => new MultiPageView(config[key]);
